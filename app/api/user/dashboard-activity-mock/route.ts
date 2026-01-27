import { authOptions } from "@/_lib/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { ActivityType } from "@prisma/client"
import { generateMockActivities } from "../../helper"
import { ActivityWindow } from "@/network/types"
import { getStartTime } from "@/_lib/utils"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const mock = searchParams.get("mock") === "true"
  const limit = Math.min(Number(searchParams.get("limit")) || 5, 50)
  const offset = Number(searchParams.get("offset")) || 0

  const typeParam = searchParams.get("type")
  const type = typeParam ? (typeParam as ActivityType) : null
  
  const windowParam = searchParams.get("window")
  const window = windowParam ? (windowParam as ActivityWindow) : null

  /* ================= MOCK MODE ================= */
  if (mock) {
    let activities = generateMockActivities(200)

    // Filter by type - proper enum validation
    if (type && Object.values(ActivityType).includes(type)) {
      activities = activities.filter(a => a.type === type)
    }

    // Filter by time window
    if (window) {
      const startTime = new Date(getStartTime(window))
      activities = activities.filter(a => {
        const activityDate = new Date(a.postedAt)
        return activityDate >= startTime
      })
    }

    // Sort by postedAt descending, then by id descending
    activities.sort((a, b) => {
      const dateA = new Date(a.postedAt).getTime()
      const dateB = new Date(b.postedAt).getTime()
      
      if (dateB !== dateA) {
        return dateB - dateA
      }
      
      // If dates are equal, sort by id descending
      return b.id.localeCompare(a.id)
    })

    // Calculate total after filtering
    const total = activities.length

    // Apply offset-based pagination
    const page = activities.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: page,
      total,
      offset,
      limit,
      mock: true,
    })
  }

  /* ================= REAL MODE ================= */
  return NextResponse.json({
    error: "Mock disabled in production",
  }, { status: 400 })
}