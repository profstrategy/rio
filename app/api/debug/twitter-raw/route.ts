// app/api/debug/twitter-raw/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/_lib/auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { accessToken, twitterId, username } = session.user

  // Test 1: Get user tweets directly from Twitter (no cache)
  const tweetsResponse = await fetch(
    `https://api.twitter.com/2/users/${twitterId}/tweets?tweet.fields=created_at,public_metrics,entities&max_results=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const tweetsData = await tweetsResponse.json()

  // Test 2: Search for user's #RIO tweets
  const searchResponse = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=from:${username} (#RIO OR $RIO)&tweet.fields=created_at,public_metrics,entities&max_results=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const searchData = await searchResponse.json()

  // Test 3: Get user info
  const userResponse = await fetch(
    `https://api.twitter.com/2/users/${twitterId}?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const userData = await userResponse.json()

  return NextResponse.json({
    session: {
      twitterId,
      username,
      hasAccessToken: !!accessToken,
    },
    rawTwitterData: {
      allTweets: tweetsData,
      rioSearchResults: searchData,
      userInfo: userData,
    },
    filters: {
      isRioRelatedLogic: 'Check if #RIO, $RIO, #RioOnBonk, or $RioOnBonk is present',
    },
  })
}