import { authOptions } from "@/_lib/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { ActivityType } from "@prisma/client"
import { encodeCursor, decodeCursor, generateMockActivities } from "../../helper"
import { ActivityWindow } from "@/network/types"
import { getStartTime } from "@/_lib/utils"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const mock = searchParams.get("mock") === "true"
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50)
  const cursor = searchParams.get("cursor")

  const type = searchParams.get("type") as ActivityType | null
  const window = searchParams.get("window") as ActivityWindow | null

  /* ================= MOCK MODE ================= */
  if (mock) {
    let activities = generateMockActivities(200)

    // Filter by type
    if (type) {
      activities = activities.filter(a => a.type === type)
    }

    // Filter by time window
    if (window) {
      const startTime = new Date(getStartTime(window))
      activities = activities.filter(
        a => new Date(a.postedAt) >= startTime
      )
    }

    // Cursor pagination
    if (cursor) {
      const decoded = decodeCursor(cursor)
      activities = activities.filter(a => {
        if (new Date(a.postedAt) < decoded.postedAt) return true
        if (
          new Date(a.postedAt).getTime() ===
            decoded.postedAt.getTime() &&
          a.id < decoded.id
        ) {
          return true
        }
        return false
      })
    }

    const page = activities.slice(0, limit + 1)

    let nextCursor: string | null = null
    if (page.length > limit) {
      const next = page.pop()!
      nextCursor = encodeCursor({
        postedAt: new Date(next.postedAt),
        id: next.id,
      })
    }

    return NextResponse.json({
      success: true,
      data: page,
      nextCursor,
      mock: true,
      totalMockCount: activities.length,
    })
  }

  /* ================= REAL MODE ================= */
  return NextResponse.json({
    error: "Mock disabled in production",
  })
}
