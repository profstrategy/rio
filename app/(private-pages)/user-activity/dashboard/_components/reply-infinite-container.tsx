"use client"

import { useActivityUrlState } from "@/hooks/use-activity-window-from-url"
import { useActivityPaginated } from "@/hooks/use-activity-infinite-scroll"
import { ActivityType } from "@prisma/client"
import { ActivityTableSkeleton } from "@/components/reusables/skeletons/skeleton"
import { ActivityTable } from "@/components/reusables/activity-table"


export function ReplyInfiniteContainer({ type }: { type?: ActivityType }) {
  const { window, page, setPage } = useActivityUrlState()

  const {
    data,
    isLoading,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = useActivityPaginated({
    window,
    type,
    page,
  })

  if (isLoading) {
    return <ActivityTableSkeleton rows={3} />
  }

  return (
    <ActivityTable
      data={data}
      page={page}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={() => setPage(page + 1)}
      onPreviousPage={() => setPage(page - 1)}
      onGoToPage={setPage}
    />
  )
}
