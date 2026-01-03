"use client"
import { ActivityWindow } from "@/network/types"
import { ActivityType } from "@prisma/client"
import { ActivityTableSkeleton } from "./skeletons/skeleton"
import { ActivityTable } from "./activity-table"
import { useActivityPaginated } from "@/hooks/use-activity-infinite-scroll"

export function ActivityPaginatedContainer({
  window,
  type,
}: {
  window?: ActivityWindow
  type?: ActivityType
}) {
  const {
    data,
    isLoading,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useActivityPaginated({ window, type })

  if (isLoading) {
    return <ActivityTableSkeleton rows={10} />
  }

  return (
    <ActivityTable
      data={data}
      page={page}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={goToNextPage}
      onPreviousPage={goToPreviousPage}
      onGoToPage={goToPage}
    />
  )
}