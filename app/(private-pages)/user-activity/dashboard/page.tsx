'use client'
import React from 'react'
import Overview from './_components/overview'
import { useGetUserActivity } from '@/network/service/user-activity-dashboard'
import { Spinner } from '@/components/ui/spinner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react'

const DashboardPage = () => {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    isFetching,
    isRefetching 
  } = useGetUserActivity()

  // 1. Handle authentication states
  if (sessionStatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (sessionStatus === 'unauthenticated') {
    router.push('/')
    return null
  }

  // 2. Handle initial loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 h-12 w-12" />
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
        </div>
      </div>
    )
  }

  // 3. Handle error states
  if (isError) {
    const errorMessage = error?.message || 'Unknown error occurred'
    const isRateLimited = errorMessage.includes('429') || errorMessage.includes('Rate limit')
    const isUnauthorized = errorMessage.includes('401') || errorMessage.includes('Unauthorized')
    const isNetworkError = errorMessage.includes('fetch failed') || errorMessage.includes('Network')

    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            {isRateLimited ? (
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            ) : isNetworkError ? (
              <div className="p-3 bg-gray-100 rounded-full">
                <WifiOff className="h-6 w-6 text-gray-600" />
              </div>
            ) : (
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isRateLimited ? 'Rate Limit Reached' :
                 isUnauthorized ? 'Authentication Required' :
                 isNetworkError ? 'Connection Issue' :
                 'Error Loading Dashboard'}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            {isRateLimited ? 
              "You've reached Twitter's API rate limit. Your dashboard will be available again in a few minutes." :
             isUnauthorized ?
              'Your session has expired. Please sign in again to continue.' :
             isNetworkError ?
              'Unable to connect to the server. Please check your internet connection.' :
              'We encountered an issue loading your dashboard data.'}
          </p>

          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded mb-4">
            <p className="font-mono text-xs">{errorMessage}</p>
          </div>

          <div className="flex gap-3">
            {isUnauthorized ? (
              <button
                onClick={() => router.push('/')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign In Again
              </button>
            ) : (
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Retrying...' : 'Try Again'}
              </button>
            )}
            
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 4. Handle no data state (shouldn't happen with proper API response)
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">No dashboard data available</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reload Dashboard
          </button>
        </div>
      </div>
    )
  }

  // 5. Success state - render dashboard
  return (
    <div className="relative">
      {/* Background refresh indicator */}
      {isRefetching && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm">Updating data...</span>
        </div>
      )}

      <Overview overview={data} />
    </div>
  )
}

export default DashboardPage