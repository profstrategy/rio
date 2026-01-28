import { ActivityWindow } from "@/network/types"
import { ActivityType } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

interface Params {
  window?: ActivityWindow
  type?: ActivityType
  page: number
  enabled?: boolean
}

export function useAppMockQueryPaginated(params: Params, queryKey:string, url:string) {
  const PAGE_SIZE = 5
  const offset = (params.page - 1) * PAGE_SIZE

  const query = useQuery({
    queryKey: [queryKey, params.window, params.type, params.page],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        mock: "true",
        limit: PAGE_SIZE.toString(),
        offset: offset.toString(),
      })

      if (params.window) queryParams.append("window", params.window)
      if (params.type) queryParams.append("type", params.type)

      const res = await fetch(
        `${url}?${queryParams.toString()}`
      )

      if (!res.ok) throw new Error("Failed to fetch activities")
      return res.json()
    },
    staleTime: 60_000,
    enabled: params.enabled ?? true,
  })

  const totalPages = query.data?.total
    ? Math.ceil(query.data.total / PAGE_SIZE)
    : 0

  return {
    ...query,
    data: query.data?.data ?? [],
    totalPages,
    page: params.page,
    hasNextPage: params.page < totalPages,
    hasPreviousPage: params.page > 1,
  }
}
