import { RioActivityMetricsResponse } from "@/app/api/user/dashboard-activity-metrics/types"
import { fetchActivityMock, useAppQuery } from "../client-constructor"
import { generateBaseQueryKeyFromRoute, network_routes } from "../route"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useGetUserActivity = (params?: { page: number }) => {
const baseQueryKey = generateBaseQueryKeyFromRoute(network_routes.user_activity_dashboard)

return useAppQuery<RioActivityMetricsResponse>({
    apiRoute: network_routes.user_activity_dashboard,
    queryKey: [ baseQueryKey, params && params ],
})
}

interface UseGetActivityMockParams {
  limit: number
  window?: string
}

export const useGetActivityMockData = ({
  limit,
  window,
}: UseGetActivityMockParams) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    network_routes.user_activity_table_mock
  )

  return useInfiniteQuery({
    queryKey: [...baseQueryKey, { limit, window, mock: true }],
    queryFn: ({ pageParam }) =>
      fetchActivityMock({
        limit,
        cursor: pageParam,
        window,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    staleTime: 60_000,
    retry: 1,
  })
}