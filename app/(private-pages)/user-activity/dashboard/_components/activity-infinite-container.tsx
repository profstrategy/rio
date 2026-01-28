"use client"
import { useDashboardActivityUrlState } from "@/hooks/use-dashboard-window-from-url"
import { ActivityTable } from "../../../../../components/reusables/activity-table"
import { ActivityTableSkeleton } from "../../../../../components/reusables/skeletons/skeleton"
import { useGetUserActivityMock } from "@/network/service/user-activity-dashboard"


export function ActivityPaginatedContainer() {
  const { page, setPage, } = useDashboardActivityUrlState()

  const {
    data,
    isLoading,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = useGetUserActivityMock()
  if (isLoading) {
    return <ActivityTableSkeleton rows={5} />
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
