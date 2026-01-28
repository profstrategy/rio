import { generateBaseQueryKeyFromRoute, network_routes } from "../route"
import { ActivityType } from "@prisma/client"
import { useAppMockQueryPaginated } from "@/hooks/use-app-mock-query-paginated"
import { RioActivityMetricsResponse } from "@/app/api/user/dashboard-activity-metrics/types"
import { useAppQuery } from "../client-constructor"
import { useDashboardActivityUrlState, useDashboardRepliesUrlState } from "@/hooks/use-dashboard-window-from-url"

export const useGetUserActivity = (params?: { page: number }) => {
const baseQueryKey = generateBaseQueryKeyFromRoute(network_routes.user_activity)

return useAppQuery<RioActivityMetricsResponse>({
    apiRoute: network_routes.user_activity,
    queryKey: [ baseQueryKey, params && params ],
})
}

export const useGetUserActivityMock = (type?:ActivityType) => {
  const { window, page } = useDashboardActivityUrlState()
  const apiUrl = network_routes.user_activity_table_mock;
  const apiKey = generateBaseQueryKeyFromRoute(apiUrl);
  return useAppMockQueryPaginated({ window, page, type }, apiKey, apiUrl)
}

export const useGetUserRepliesMock = (type?:ActivityType) => {
  const { window, page } = useDashboardRepliesUrlState()
  const apiUrl = network_routes.user_replies_table_mock;
  const apiKey = generateBaseQueryKeyFromRoute(apiUrl);
  return useAppMockQueryPaginated({ window, page, type }, apiKey, apiUrl)
}

