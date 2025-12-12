'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AppButton from "../ui/app-button"

export default function TwitterConnect() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    return (
      <div className="space-y-4">
        {/* Show connected state */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">
            ✓ Connected as @{session.user?.username || session.user?.name}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <AppButton
            onClick={() => router.push('/')}
           
          >
             Dashboard
          </AppButton>
          
          <AppButton
            onClick={() => signOut({ callbackUrl: '/' })}
           
          >
            Disconnect
          </AppButton>
        </div>
      </div>
    )
  }

  return (
    <AppButton
      onClick={() => signIn("twitter", { callbackUrl: '/' })}
     
    >
      Connect Twitter
    </AppButton>
  )
}