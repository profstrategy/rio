import { RioActivityMetricsResponse } from "@/app/api/user/dashboard-activity-metrics/types"
import { useAppQuery } from "../client-constructor"
import { generateBaseQueryKeyFromRoute, network_routes } from "../route"
import { ActivityWindow } from "../types"
import { ActivityType } from "@prisma/client"
import axios from "axios"

export const useGetUserActivity = (params?: { page: number }) => {
const baseQueryKey = generateBaseQueryKeyFromRoute(network_routes.user_activity_dashboard)

return useAppQuery<RioActivityMetricsResponse>({
    apiRoute: network_routes.user_activity_dashboard,
    queryKey: [ baseQueryKey, params && params ],
})
}

interface FetchActivityParams {
  limit: number
  offset: number
  window?: ActivityWindow
  type?: ActivityType
}

interface ActivityResponse {
  success: boolean
  data: any[]
  total: number
  offset: number
  limit: number
  mock?: boolean
}

export async function fetchActivityMock(
  params: FetchActivityParams
): Promise<ActivityResponse> {
  const queryParams = new URLSearchParams({
    mock: "true",
    limit: params.limit.toString(),
    offset: params.offset.toString(),
  })

  if (params.window) {
    queryParams.append("window", params.window)
  }

  if (params.type) {
    queryParams.append("type", params.type)
  }

  const response = await axios.get(
    `/api/user/dashboard-activity-mock?${queryParams.toString()}`
  )

  return response.data
}

export async function fetchActivityReal(
  params: FetchActivityParams
): Promise<ActivityResponse> {
  const queryParams = new URLSearchParams({
    limit: params.limit.toString(),
    offset: params.offset.toString(),
  })

  if (params.window) {
    queryParams.append("window", params.window)
  }

  if (params.type) {
    queryParams.append("type", params.type)
  }

  const response = await axios.get(
    `/api/activity?${queryParams.toString()}`
  )

  return response.data
}