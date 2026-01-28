"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import { ActivityWindow } from "@/network/types"

export function useDashboardActivityUrlState() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const window = useMemo<ActivityWindow>(() => {
    const value = searchParams.get("window")
    return value === "24h" || value === "3d" || value === "7d"
      ? value
      : "24h"
  }, [searchParams])

  const page = useMemo(() => {
    const value = Number(searchParams.get("activityPage"))
    return Number.isFinite(value) && value > 0 ? value : 1
  }, [searchParams])

  const update = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => params.set(k, String(v)))
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return {
    window,
    page,
    setWindow: (w: ActivityWindow) =>
      update({
        window: w,
        activityPage: 1,
        repliesPage: 1,
      }),
    setPage: (p: number) =>
      update({ activityPage: p }),
  }
}

export function useDashboardRepliesUrlState() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const window = useMemo<ActivityWindow>(() => {
    const value = searchParams.get("window")
    return value === "24h" || value === "3d" || value === "7d"
      ? value
      : "24h"
  }, [searchParams])

  const page = useMemo(() => {
    const value = Number(searchParams.get("repliesPage"))
    return Number.isFinite(value) && value > 0 ? value : 1
  }, [searchParams])

  const update = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => params.set(k, String(v)))
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return {
    window,
    page,
    setWindow: (w: ActivityWindow) =>
      update({
        window: w,
        activityPage: 1,
        repliesPage: 1,
      }),
    setPage: (p: number) =>
      update({ repliesPage: p }),
  }
}
