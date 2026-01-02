import { authOptions } from "@/_lib/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { decodeCursor, encodeCursor } from "../../helper"
import prisma from "@/lib/prisma"
import { ActivityType } from "@prisma/client"
import { ActivityWindow } from "@/network/types"
import { getStartTime } from "@/_lib/utils"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url);

  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);
  const cursor = searchParams.get("cursor");
   const mock = searchParams.get("mock") === "true";

  const type = searchParams.get("type") as ActivityType | null
  const window = searchParams.get("window") as ActivityWindow | null

  const startTime = window ? new Date(getStartTime(window)) : undefined;

  const activities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
      isRioRelated: true,

      ...(type && { type }),

      ...(startTime && {
        postedAt: {
          gte: startTime,
        },
      }),
    },

    orderBy: [
      { postedAt: "desc" },
      { id: "desc" },
    ],

    take: limit + 1,

    ...(cursor && {
      cursor: decodeCursor(cursor),
      skip: 1,
    }),
  })

  let nextCursor: string | null = null

  if (activities.length > limit) {
    const nextItem = activities.pop()!
    nextCursor = encodeCursor({
      postedAt: nextItem.postedAt,
      id: nextItem.id,
    })
  }

  return NextResponse.json({
    success: true,
    data: activities.map(a => ({
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
    nextCursor,
  })
}
