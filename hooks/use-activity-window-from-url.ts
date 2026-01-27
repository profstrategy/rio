"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import { ActivityWindow } from "@/network/types"

const DEFAULT_WINDOW: ActivityWindow = "24h"
const DEFAULT_PAGE = 1

export function useActivityUrlState() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const window = useMemo<ActivityWindow>(() => {
    const value = searchParams.get("window")
    return value === "24h" || value === "3d" || value === "7d"
      ? value
      : DEFAULT_WINDOW
  }, [searchParams])

  const page = useMemo<number>(() => {
    const value = Number(searchParams.get("page"))
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_PAGE
  }, [searchParams])

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value))
    })

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const setWindow = (next: ActivityWindow) => {
    updateParams({
      window: next,
      page: 1, // reset pagination when filter changes
    })
  }

  const setPage = (next: number) => {
    updateParams({ page: next })
  }

  return {
    window,
    page,
    setWindow,
    setPage,
  }
}
