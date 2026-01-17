'use client'
import React from 'react'
import Overview from './_components/overview'
import { useGetUserActivity } from '@/network/service/user-activity-dashboard'
import { Spinner } from '@/components/ui/spinner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AlertCircle, RefreshCw, WifiOff, ShieldAlert } from 'lucide-react'

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

  // --- STYLES ---
  const styles = {
    pageContainer: "min-h-screen bg-[#020617] text-white font-space selection:bg-[#00D2FF]/30 flex items-center justify-center relative overflow-hidden",
    glassCard: "bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-[30px] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 max-w-md w-full relative z-10",
    buttonPrimary: "w-full py-3 bg-gradient-to-r from-[#00D2FF] to-[#0099ff] text-black font-sync font-bold uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center justify-center gap-2",
    buttonSecondary: "w-full py-3 bg-white/5 text-gray-400 font-sync font-bold uppercase tracking-wider rounded-xl hover:bg-white/10 hover:text-white transition-all border border-white/5",
    heading: "font-sync font-bold text-2xl uppercase tracking-widest mb-2",
    body: "font-space text-gray-400 text-sm leading-relaxed",
    iconContainer: (colorClass: string, borderColor: string) => `p-4 rounded-full bg-[${colorClass}]/10 border border-[${borderColor}]/30 mb-6 mx-auto inline-flex shadow-[0_0_30px_rgba(0,0,0,0.5)]`
  }

  // 1. Handle authentication states
  if (sessionStatus === 'loading') {
    return (
      <div className={styles.pageContainer}>
        <div className="text-center">
          <Spinner className="mx-auto mb-6 text-[#00D2FF] w-10 h-10" />
          <p className="font-sync text-[#00D2FF] text-xs uppercase tracking-[0.3em] animate-pulse">Authenticating...</p>
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
      <div className={styles.pageContainer}>
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00D2FF]/10 blur-[100px] rounded-full" />
        
        <div className="text-center relative z-10">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#00D2FF]/20 blur-xl rounded-full animate-pulse" />
            <Spinner className="relative z-10 mx-auto h-16 w-16 text-[#00D2FF]" />
          </div>
          <h2 className={`${styles.heading} text-white`}>System Initializing</h2>
          <p className={`${styles.body} text-[#00D2FF]/60 mt-2`}>Decrypting User Metrics...</p>
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
      <div className={styles.pageContainer}>
        <div className={styles.glassCard}>
          <div className="text-center">
            {isRateLimited ? (
              <div className="inline-flex p-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            ) : isNetworkError ? (
              <div className="inline-flex p-4 rounded-full bg-gray-500/10 border border-gray-500/30 mb-6">
                <WifiOff className="h-8 w-8 text-gray-400" />
              </div>
            ) : (
              <div className="inline-flex p-4 rounded-full bg-red-500/10 border border-red-500/30 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <ShieldAlert className="h-8 w-8 text-red-500" />
              </div>
            )}
            
            <h3 className={`${styles.heading} text-white`}>
              {isRateLimited ? 'System Cooldown' :
               isUnauthorized ? 'Access Denied' :
               isNetworkError ? 'Signal Lost' :
               'System Failure'}
            </h3>

            <p className={`${styles.body} mb-6`}>
              {isRateLimited ? 
                "API rate limits exceeded. Cooling down thrusters. Please wait." :
               isUnauthorized ?
                'Session token expired. Re-authentication required.' :
               isNetworkError ?
                'Unable to establish uplink. Check your connection.' :
                'An anomaly was detected in the data stream.'}
            </p>

            <div className="text-xs font-mono text-red-400 bg-red-950/30 border border-red-900/50 p-3 rounded-lg mb-8 break-all">
              Error: {errorMessage}
            </div>

            <div className="flex flex-col gap-3">
              {isUnauthorized ? (
                <button
                  onClick={() => router.push('/')}
                  className={styles.buttonPrimary}
                >
                  Reconnect Wallet
                </button>
              ) : (
                <button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className={`${styles.buttonPrimary} disabled:opacity-50 disabled:grayscale`}
                >
                  <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                  {isFetching ? 'Retrying...' : 'Reboot System'}
                </button>
              )}
              
              <button
                onClick={() => router.push('/')}
                className={styles.buttonSecondary}
              >
                Abort & Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 4. Handle no data state
  if (!data) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.glassCard}>
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-gray-800/50 border border-gray-700 mb-6">
               <AlertCircle className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className={`${styles.heading} text-white`}>No Data Stream</h3>
            <p className={`${styles.body} mb-8`}>Dashboard metrics are currently unavailable.</p>
            <button
              onClick={() => refetch()}
              className={styles.buttonPrimary}
            >
              Reload Uplink
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 5. Success state - render dashboard
  return (
    <div className="relative min-h-screen bg-[#020617]">
      {/* Background refresh indicator */}
      {isRefetching && (
        <div className="fixed bottom-6 right-6 z-50 glass-premium bg-black/60 border border-[#3AFFAD]/50 text-[#3AFFAD] px-6 py-3 rounded-full shadow-[0_0_20px_rgba(58,255,173,0.2)] flex items-center gap-3 animate-slide-in backdrop-blur-md">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="font-sync text-xs font-bold uppercase tracking-widest">Syncing Data...</span>
        </div>
      )}

      <Overview overview={data} />
    </div>
  )
}

export default DashboardPage