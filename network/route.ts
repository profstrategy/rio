/**
 * Generates a base query key from a route string by converting it to PascalCase
 *
 * @param route - The API route string to convert (e.g. 'core/admin/user-admin/')
 * @returns A PascalCase string suitable for use as a React Query key (e.g. 'CoreAdminUserAdmin')
 *
 * @example
 * generateBaseQueryKeyFromRoute('core/admin/user-admin/') // Returns 'CoreAdminUserAdmin'
 * generateBaseQueryKeyFromRoute('auth/login/') // Returns 'AuthLogin'
 */

export const network_routes = {
    user_activity_dashboard: 'user/dashboard-activity'
}

export const generateBaseQueryKeyFromRoute = (route:string):string => {
const segments = route.split('/').filter(Boolean)
const PascalCaseKey = segments.map(segment => segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')).join('/')

return PascalCaseKey
}