'use client'
import { ShieldHalf } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
       <div className="col-span-full flex flex-col items-center justify-center p-12 bg-rio-sky-200/30 rounded-lg border-2 border-dashed border-rio-sky-500/30">
        <div className="w-16 h-16 bg-linear-to-r from-sky-400/30 to-sky-600/30 rounded-full flex items-center justify-center mb-4">
            <ShieldHalf className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-rio-sky-200/50 mb-1">Something went wrong</h3>
    </div>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}