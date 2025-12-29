import { useAppQuery } from "../client-constructor"
import { generateBaseQueryKeyFromRoute, network_routes } from "../route"
import { UserActivityDashboardResponse } from "../types"

export const useGetUserActivity = (params?: { page: number }) => {
const baseQueryKey = generateBaseQueryKeyFromRoute(network_routes.user_activity_dashboard)

return useAppQuery<UserActivityDashboardResponse>({
    apiRoute: network_routes.user_activity_dashboard,
    queryKey: [ baseQueryKey, params && params ],
})
}