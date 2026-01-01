import { authOptions } from "@/_lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { getUserLikes } from "../get-rio-likes/route"
import { searchRioUserActivityPaginated } from "../get-rio-activity/route"
import { testRedis } from "@/lib/test-redis"
import { ActivityType, Prisma } from "@prisma/client"

function normalizeTweetToActivity(
  tweet: any,
  userId: string
): Prisma.ActivityUncheckedCreateInput {
  const ref = tweet.referenced_tweets?.[0]

  let type: ActivityType = ActivityType.TWEET
  if (ref) {
    if (ref.type === "retweeted") type = ActivityType.RETWEET
    else if (ref.type === "replied_to") type = ActivityType.REPLY
    else if (ref.type === "quoted") type = ActivityType.QUOTE
  }

  return {
    userId: userId,
    tweetId: tweet.id,
    type,
    text: tweet.text?.slice(0, 500) ?? "",
    likes: tweet.public_metrics?.like_count ?? 0,
    retweets: tweet.public_metrics?.retweet_count ?? 0,
    replies: tweet.public_metrics?.reply_count ?? 0,
    quotes: tweet.public_metrics?.quote_count ?? 0,
    hashtags: tweet.entities?.hashtags?.map((h: any) => h.tag) ?? [],
    mentions: tweet.entities?.mentions?.map((m: any) => m.username) ?? [],
    postedAt: new Date(tweet.created_at),
    isRioRelated: true,
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const testMode = searchParams.get('mock') === 'true'

  try {
    // 1. Session
    const session = await getServerSession(authOptions)


   // MOCK DATA MODE - Use while rate limited
if (testMode) {
  const now = new Date()

  return NextResponse.json({
    success: true,
    mock: true,
    data: {
      user: {
        username: session?.user.username ?? 'testuser',
        displayName: session?.user.name ?? 'Test User',
      },

      metrics: {
        totalTweets: 3,
        totalLikes: 45,
        totalRetweets: 12,
        totalReplies: 6,
        totalQuotes: 4,
        totalEngagement: 67,
      },

      count: 6,

      yappingScore: 395,

      activities: {
        items: [
          {
            id: 'mock-1',
            tweetId: '123456789',
            type: 'TWEET',
            text: '#RIO is coming 🚀',
            likes: 15,
            retweets: 5,
            replies: 2,
            quotes: 1,
            postedAt: now.toISOString(),
          },
          {
            id: 'mock-2',
            tweetId: '123456788',
            type: 'RETWEET',
            text: 'RT @rio: Big things ahead',
            likes: 10,
            retweets: 4,
            replies: 1,
            quotes: 0,
            postedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
          },
          {
            id: 'mock-3',
            tweetId: '123456787',
            type: 'REPLY',
            text: 'This is huge 🔥',
            likes: 8,
            retweets: 2,
            replies: 3,
            quotes: 1,
            postedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
          },
        ],

        pageInfo: {
          nextCursor: 'mock-3',
          hasNextPage: true,
        },
      },
    },
  })
}


    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.error === "RefreshAccessTokenError") {
      return NextResponse.json(
        { error: "Token expired. Please sign in again." },
        { status: 401 }
      )
    }

    if (process.env.NODE_ENV === "development") {
      await testRedis()
    }

    const { accessToken, twitterId, username, id } = session.user
    if (!accessToken || !username) {
      return NextResponse.json(
        { error: "Twitter connection required" },
        { status: 400 }
      )
    }

    // 2. Fetch ingestion sources (ONLY)
    const [likesResult, searchResult] = await Promise.allSettled([
      getUserLikes(twitterId || id, 100, accessToken),
      searchRioUserActivityPaginated(username, "24h", 10, accessToken),
    ])

    const userLikes = likesResult.status === "fulfilled" ? likesResult.value : []
    const searchData =
      searchResult.status === "fulfilled"
        ? searchResult.value.searchResults
        : []

    // 3. Normalize & upsert activities (idempotent)
    const activityInputs = searchData.map(tweet =>
      normalizeTweetToActivity(tweet, session.user.id)
    )

    if (activityInputs.length > 0) {
      await prisma.$transaction(
        activityInputs.map(activity =>
          prisma.activity.upsert({
            where: {
              tweetId_userId: {
                tweetId: activity.tweetId,
                userId: activity.userId,
              },
            },
            create: activity,
            update: {
              text: activity.text,
              likes: activity.likes,
              retweets: activity.retweets,
              replies: activity.replies,
              quotes: activity.quotes,
            },
          })
        )
      )
    }

    // 4. Aggregate metrics FROM DATABASE
    const activityAgg = await prisma.activity.aggregate({
      where: {
        userId: session.user.id,
        isRioRelated: true,
      },
      _count: {
        _all: true,
      },
      _sum: {
        likes: true,
        retweets: true,
        replies: true,
        quotes: true,
      },
    })

    const totalTweets = await prisma.activity.count({
      where: {
        userId: session.user.id,
        type: ActivityType.TWEET,
        isRioRelated: true,
      },
    })

    const totalEngagement =
      (activityAgg._sum.likes ?? 0) +
      (activityAgg._sum.retweets ?? 0) +
      (activityAgg._sum.replies ?? 0) +
      (activityAgg._sum.quotes ?? 0)

    // 5. Yapping score (FIXED & CONSISTENT)
    const yappingScore =
      totalTweets * 10 +
      (activityAgg._sum.retweets ?? 0) * 5 +
      (activityAgg._sum.replies ?? 0) * 8 +
      (activityAgg._sum.quotes ?? 0) * 7 +
      userLikes.length * 10 +
      totalEngagement * 2 +
      userLikes.length * 10

    // 6. Update user snapshot
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalTweets,
        totalLikes: userLikes.length,
        engagementScore: yappingScore,
        lastSyncedAt: new Date(),
      },
    })

    // 7. Response (DB-backed, stable)
    return NextResponse.json({
      success: true,
      data: {
        user: {
          username: session.user.username,
          displayName: session.user.name,
        },
        metrics: {
          totalTweets,
          totalLikes: userLikes.length,
          totalRetweets: activityAgg._sum.retweets ?? 0,
          totalReplies: activityAgg._sum.replies ?? 0,
          totalQuotes: activityAgg._sum.quotes ?? 0,
          totalEngagement,
        },
        count: activityAgg._count._all,
        yappingScore,
      },
    })
  } catch (error: any) {
    console.error("Dashboard API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    )
  }
}
