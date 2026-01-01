// app/api/debug/rate-limit-check/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/_lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = await fetch('https://api.twitter.com/2/users/me', {
    headers: { Authorization: `Bearer ${session.user.accessToken}` },
  })

  const resetTime = response.headers.get('x-rate-limit-reset')
  const remaining = response.headers.get('x-rate-limit-remaining')
  
  const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null
  const minutesLeft = resetDate 
    ? Math.ceil((resetDate.getTime() - Date.now()) / 60000) 
    : 15

  return NextResponse.json({
    rateLimited: response.status === 429,
    remaining,
    resetTime: resetDate?.toLocaleString(),
    waitMinutes: minutesLeft,
    message: `Wait ${minutesLeft} minutes until ${resetDate?.toLocaleTimeString()}`,
  })
}