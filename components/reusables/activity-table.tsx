// ActivityTable.tsx
"use client"

import { ActivityItem } from "@/network/types"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

interface Props {
    data: ActivityItem[]
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    onNextPage: () => void
    onPreviousPage: () => void
    onGoToPage: (page: number) => void
}

export const activityColumns: ColumnDef<ActivityItem>[] = [
    { 
        accessorKey: "type", 
        header: "Type",
        cell: ({ getValue }) => {
            const type = getValue() as string
            return <span className="font-medium capitalize">{type.toLowerCase()}</span>
        }
    },
    { 
        accessorKey: "text", 
        header: "Content",
        cell: ({ getValue }) => {
            const text = getValue() as string
            return (
                <div className="max-w-md truncate" title={text}>
                    {text || '-'}
                </div>
            )
        }
    },
    { accessorKey: "likes", header: "❤️" },
    { accessorKey: "retweets", header: "🔄" },
    { accessorKey: "replies", header: "💬" },
    { accessorKey: "quotes", header: "💭" },
]

export function ActivityTable({ 
    data, 
    page, 
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onNextPage,
    onPreviousPage,
    onGoToPage,
}: Props) {
    const table = useReactTable({
        data,
        columns: activityColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const showPages = 5
        
        if (totalPages <= showPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        if (page <= 3) {
            pages.push(1, 2, 3, 4, '...', totalPages)
        } else if (page >= totalPages - 2) {
            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
        } else {
            pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
        }

        return pages
    }

    return (
        <div className="space-y-4">
            <div className="relative overflow-auto max-h-[420px] rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-[900px] w-full border-collapse">
                    <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-50 backdrop-blur border-b border-slate-200">
                        {table.getHeaderGroups().map(hg => (
                            <tr key={hg.id}>
                                {hg.headers.map(h => (
                                    <th
                                        key={h.id}
                                        className="px-4 py-3 text-left text-xs font-bold text-sky-700 uppercase tracking-wide"
                                    >
                                        {flexRender(h.column.columnDef.header, h.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="bg-white">
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td 
                                    colSpan={activityColumns.length} 
                                    className="px-4 py-12 text-center text-slate-500"
                                >
                                    No activities found
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row, idx) => (
                                <tr
                                    key={row.id}
                                    className={`border-t border-slate-100 hover:bg-sky-50/60 transition-colors ${
                                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                                    }`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-4 py-3 text-sm text-slate-600"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 0 && (
                <div className="flex items-center justify-between px-2 py-3">
                    <div className="text-sm text-slate-600">
                        Page <span className="font-semibold text-sky-700">{page}</span> of{" "}
                        <span className="font-semibold text-sky-700">{totalPages}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={!hasPreviousPage}
                            onClick={onPreviousPage}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-sky-50 hover:border-sky-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-300 transition-all shadow-sm"
                        >
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((pageNum, idx) => (
                                pageNum === '...' ? (
                                    <span key={`ellipsis-${idx}`} className="px-3 py-2 text-slate-400">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={pageNum}
                                        onClick={() => onGoToPage(pageNum as number)}
                                        className={`min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
                                            page === pageNum
                                                ? 'bg-sky-600 text-white hover:bg-sky-700'
                                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-sky-50 hover:border-sky-400'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            ))}
                        </div>

                        <button
                            disabled={!hasNextPage}
                            onClick={onNextPage}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-sky-50 hover:border-sky-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-300 transition-all shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}