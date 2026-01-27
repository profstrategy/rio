import { authOptions } from "@/_lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { getUserLikes } from "../get-rio-likes/route"
import { searchRioActivityMetrics } from "../get-rio-activity/route"
import { testRedis } from "@/lib/test-redis"
import { ActivityType, Prisma } from "@prisma/client"
import { ActivityWindow } from "@/network/types"
import { getStartTime } from "@/_lib/utils"

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

  try {
    // 1. Session
    const session = await getServerSession(authOptions)

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
      searchRioActivityMetrics(username, accessToken),
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
              likes: activity.likes,
              retweets: activity.retweets,
              replies: activity.replies,
              quotes: activity.quotes,
            },
          })
        )
      )
    }

    // 4. Get pagination params
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50)
    const offset = Number(searchParams.get("offset")) || 0
    
    const typeParam = searchParams.get("type")
    const type = typeParam ? (typeParam as ActivityType) : null
    
    const windowParam = searchParams.get("window")
    const window = windowParam ? (windowParam as ActivityWindow) : null

    const startTime = window ? new Date(getStartTime(window)) : undefined

    // 5. Build where clause with proper type checking
    const whereClause: Prisma.ActivityWhereInput = {
      userId: session.user.id,
      isRioRelated: true,
    }

    if (type && Object.values(ActivityType).includes(type)) {
      whereClause.type = type
    }

    if (startTime) {
      whereClause.postedAt = {
        gte: startTime,
      }
    }

    // 6. Get total count for pagination
    const total = await prisma.activity.count({
      where: whereClause,
    })

    // 7. Get paginated data
    const activities = await prisma.activity.findMany({
      where: whereClause,
      orderBy: [
        { postedAt: "desc" },
        { id: "desc" },
      ],
      take: limit,
      skip: offset,
    })

    // 8. Aggregate metrics FROM DATABASE (for consistency)
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

    // 9. Yapping score
    const yappingScore =
      totalTweets * 10 +
      (activityAgg._sum.retweets ?? 0) * 5 +
      (activityAgg._sum.replies ?? 0) * 8 +
      (activityAgg._sum.quotes ?? 0) * 7 +
      userLikes.length * 10 +
      totalEngagement * 2

    // 10. Update user snapshot
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalTweets,
        totalRetweets: activityAgg._sum.retweets ?? 0,
        totalReplies: activityAgg._sum.replies ?? 0,
        totalLikes: userLikes.length,
        engagementScore: yappingScore,
        lastSyncedAt: new Date(),
      },
    })

    // 11. Response (DB-backed, stable, with pagination)
    return NextResponse.json({
      success: true,
      data: activities.map((a:any) => ({
        id: a.id,
        tweetId: a.tweetId,
        type: a.type,
        text: a.text,
        likes: a.likes,
        retweets: a.retweets,
        replies: a.replies,
        quotes: a.quotes,
        postedAt: a.postedAt,
      })),
      total,
      offset,
      limit,
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
    })
  } catch (error: any) {
    console.error("Activity Table API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch activity data",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    )
  }
}