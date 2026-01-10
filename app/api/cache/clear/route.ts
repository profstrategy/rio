// app/api/cache/clear/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/_lib/auth'
import redis from '@/lib/redis'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!redis) {
      return NextResponse.json({ error: 'Redis not available' }, { status: 500 })
    }

    const userId = session.user.twitterId
    const username = session.user.username

    // Clear all cache keys for this user
    const patterns = [
      `twitter:tweets:${userId}`,
      `twitter:retweets:${userId}`,
      `twitter:likes:${userId}`,
      `twitter:search:${username}:*`,
    ]

    let clearedCount = 0
    for (const pattern of patterns) {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
        clearedCount += keys.length
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Cleared ${clearedCount} cache keys`,
      patterns 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Failed to clear cache', 
      details: error.message 
    }, { status: 500 })
  }
}