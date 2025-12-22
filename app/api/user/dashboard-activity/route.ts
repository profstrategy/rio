import { authOptions } from "@/_lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { getUserLikes } from "../get-rio-likes/route"
import { searchRioUserActivityPaginated } from "../get-rio-activity/route"
import { getRioTweetsPaginated } from "../get-rio-tweets/route"
import { getRioRetweetsPaginated } from "../get-rio-retweets/route"

export async function GET(req: NextRequest) {
  try {
    // 1. Verify session
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Check for refresh token error
    if (session.error === "RefreshAccessTokenError") {
      return NextResponse.json(
        { error: 'Token expired. Please sign in again.' },
        { status: 401 }
      )
    }

    const { accessToken, twitterId, username } = session.user

    if (!accessToken || !twitterId) {
      return NextResponse.json(
        { error: 'Twitter connection required' },
        { status: 400 }
      )
    }

    // 4. Fetch user activities in parallel
    const [retweets, likes, tweets, searchResults] = await Promise.allSettled([
      getRioRetweetsPaginated(twitterId),
      getUserLikes(twitterId),
      getRioTweetsPaginated(twitterId),
      searchRioUserActivityPaginated(username, '24h', 10),
    ])

    // 5. Process results
    const userTweets = tweets.status === 'fulfilled' ? tweets.value.tweets : []
    const userRetweets = retweets.status === 'fulfilled' ? retweets.value.retweets : []
    const userLikes = likes.status === 'fulfilled' ? likes.value : []
    const searchData = searchResults.status === 'fulfilled' ? searchResults.value : null

    // 6. Classify tweets by type
    const activities = {
      originalTweets: userTweets.filter((t: any) =>
        !t.referenced_tweets?.length
      ),
      retweets: userRetweets,
      replies: userTweets.filter((t: any) =>
        t.referenced_tweets?.some((ref: any) => ref.type === 'replied_to')
      ),
      quotes: userTweets.filter((t: any) =>
        t.referenced_tweets?.some((ref: any) => ref.type === 'quoted')
      ),
      likes: userLikes,
    }

    // 7. Calculate metrics
    const metrics = {
      totalTweets: activities.originalTweets.length,
      totalRetweets: activities.retweets.length,
      totalReplies: activities.replies.length,
      totalQuotes: activities.quotes.length,
      totalLikes: activities.likes.length,
      totalEngagement: userTweets.reduce((sum: number, t: any) =>
        sum + (t.public_metrics?.like_count || 0) +
        (t.public_metrics?.retweet_count || 0) +
        (t.public_metrics?.reply_count || 0), 0
      ),
    }

    // 8. Calculate yapping score
    const yappingScore =
      metrics.totalTweets * 10 +
      metrics.totalRetweets * 5 +
      metrics.totalReplies * 8 +
      metrics.totalQuotes * 7 +
      metrics.totalLikes * 10 +
      metrics.totalEngagement * 15

    // 9. Update database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        engagementScore: yappingScore,
        totalTweets: metrics.totalTweets,
        totalRetweets: metrics.totalRetweets,
        totalReplies: metrics.totalReplies,
        totalLikes: metrics.totalLikes,
        lastSyncedAt: new Date(),
      },
    })

    // 10. Store activities in database (for historical tracking)
    // ✅ Combine all tweets for activity tracking
    const allTweetActivities = [
      ...userTweets.map((t: any) => ({ ...t, activityType: 'TWEET' })),
      ...activities.retweets.map((t: any) => ({ ...t, activityType: 'RETWEET' })),
    ]

    const activityRecords = allTweetActivities.slice(0, 50).map((tweet: any) => ({
      userId: session.user.id,
      tweetId: tweet.id,
      type: tweet.activityType || (tweet.referenced_tweets?.length
        ? (tweet.referenced_tweets[0].type === 'retweeted' ? 'RETWEET' :
          tweet.referenced_tweets[0].type === 'replied_to' ? 'REPLY' :
            tweet.referenced_tweets[0].type === 'quoted' ? 'QUOTE' : 'TWEET')
        : 'TWEET'),
      text: tweet.text?.substring(0, 500) || '', // Limit text length
      likes: tweet.public_metrics?.like_count || 0,
      retweets: tweet.public_metrics?.retweet_count || 0,
      replies: tweet.public_metrics?.reply_count || 0,
      quotes: tweet.public_metrics?.quote_count || 0,
      hashtags: tweet.entities?.hashtags?.map((h: any) => h.tag) || [],
      mentions: tweet.entities?.mentions?.map((m: any) => m.username) || [],
      postedAt: new Date(tweet.created_at),
    }))

    // Upsert activities (skip duplicates)
    // Better error handling for batch operations
    await Promise.allSettled(
      activityRecords.map((activity: any) => {
        const updatedRecords = prisma.activity.upsert({
          where: {
            tweetId_userId: {
              tweetId: activity.tweetId,
              userId: activity.userId
            }
          },
          create: activity,
          update: {
            likes: activity.likes,
            retweets: activity.retweets,
            replies: activity.replies,
            quotes: activity.quotes,
          },
        })
        return updatedRecords
      })
    )

    // 11. Return dashboard data
    return NextResponse.json({
      success: true,
      data: {
        user: {
          username: session.user.username,
          displayName: session.user.name,
        },
        metrics: {
          ...metrics,
        },
        yappingScore: yappingScore,
        activities: {
          tweets: activities.originalTweets.slice(0, 10),
          retweets: activities.retweets.slice(0, 10),
          replies: activities.replies.slice(0, 10),
          quotes: activities.quotes.slice(0, 10),
          likes: activities.likes.slice(0, 10),
        },
        searchData,
      },
    })

  } catch (error: any) {
    console.error('Dashboard API Error:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch dashboard data',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}