"use client"
import { ActivityType } from "@prisma/client"
import { ActivityTableSkeleton } from "@/components/reusables/skeletons/skeleton"
import { ActivityTable } from "@/components/reusables/activity-table"
import { useGetUserRepliesMock } from "@/network/service/user-activity-dashboard"
import { useDashboardRepliesUrlState } from "@/hooks/use-dashboard-window-from-url"


export function ReplyInfiniteContainer({ type }: { type?: ActivityType }) {
  const { page, setPage } = useDashboardRepliesUrlState()

  const {
    data,
    isLoading,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = useGetUserRepliesMock(type)

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
