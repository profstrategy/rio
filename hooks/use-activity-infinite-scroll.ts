import { useQuery } from "@tanstack/react-query"
import { ActivityType } from "@prisma/client"
import { ActivityWindow } from "@/network/types"
import { useState } from "react"

interface Params {
  window?: ActivityWindow
  type?: ActivityType
  enabled?: boolean
}

const PAGE_SIZE = 10

export function useActivityPaginated(params: Params) {
  const [page, setPage] = useState(1)

  const query = useQuery({
    queryKey: ["activity-paginated", params.window, params.type, page],
    queryFn: async () => {
      const offset = (page - 1) * PAGE_SIZE
      
      const queryParams = new URLSearchParams({
        mock: "true",
        limit: PAGE_SIZE.toString(),
        offset: offset.toString(),
      })

      if (params.window) {
        queryParams.append("window", params.window)
      }

      if (params.type) {
        queryParams.append("type", params.type)
      }

      const response = await fetch(`/api/user/dashboard-activity-mock?${queryParams.toString()}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch activities")
      }

      return response.json()
    },
    enabled: params.enabled ?? true,
    staleTime: 60_000,
  })

  const totalPages = query.data?.total 
    ? Math.ceil(query.data.total / PAGE_SIZE)
    : 0

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber)
    }
  }

  return {
    ...query,
    data: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page,
    totalPages,
    pageSize: PAGE_SIZE,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}