'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphic card */}
        <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm border border-red-500/30">
                <svg 
                  className="w-8 h-8 text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              Something went wrong!
            </h2>

            {/* Error message (optional) */}
            <p className="text-white/70 text-center text-sm md:text-base">
              We encountered an unexpected error. Please try again.
            </p>

            {/* Error digest (if available) */}
            {error.digest && (
              <p className="text-white/50 text-center text-xs font-mono">
                Error ID: {error.digest}
              </p>
            )}

            {/* Action button */}
            <button
              onClick={() => reset()}
              className="w-full py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 active:scale-95"
            >
              Try again
            </button>
          </div>
        </div>

        {/* Decorative blur circles */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  )
}