// ActivityTable.tsx
"use client"

import { ActivityItem } from "@/network/types"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

// Updated Column Definitions with RIO Styling
export const activityColumns: ColumnDef<ActivityItem>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => {
            const type = getValue() as string
            // Badge style for the Type
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20">
                    {type.toLowerCase()}
                </span>
            )
        }
    },
    {
        accessorKey: "text",
        header: "Content",
        cell: ({ getValue }) => {
            const text = getValue() as string
            return (
                <div className="max-w-md truncate font-space text-gray-300" title={text}>
                    {text || '-'}
                </div>
            )
        }
    },
    // Centered metrics with darker headers
    { accessorKey: "likes", header: "❤️", cell: (info) => <span className="font-mono text-xs text-gray-400">{info.getValue() as number}</span> },
    { accessorKey: "retweets", header: "🔄", cell: (info) => <span className="font-mono text-xs text-gray-400">{info.getValue() as number}</span> },
    { accessorKey: "replies", header: "💬", cell: (info) => <span className="font-mono text-xs text-gray-400">{info.getValue() as number}</span> },
    { accessorKey: "quotes", header: "💭", cell: (info) => <span className="font-mono text-xs text-gray-400">{info.getValue() as number}</span> },
]

export function RepliesTable({
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
            {/* Dark Glass Table Container */}
            <div className="relative overflow-auto max-h-[420px] rounded-[20px] border border-white/5 bg-[#0f172a]/40 backdrop-blur-sm scrollbar-thin scrollbar-thumb-[#00D2FF]/20 scrollbar-track-transparent">
                <table className="min-w-[900px] w-full border-collapse">
                    
                    {/* Header */}
                    <thead className="sticky top-0 z-10 bg-[#020617]/95 backdrop-blur-md border-b border-white/5">
                        {table.getHeaderGroups().map(hg => (
                            <tr key={hg.id}>
                                {hg.headers.map(h => (
                                    <th
                                        key={h.id}
                                        className="px-6 py-4 text-left text-[10px] font-bold font-sync text-[#00D2FF] uppercase tracking-[0.2em]"
                                    >
                                        {flexRender(h.column.columnDef.header, h.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-white/5">
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={activityColumns.length}
                                    className="px-6 py-12 text-center text-gray-500 font-space"
                                >
                                    No signals detected...
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row, idx) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 text-sm text-gray-400"
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
                <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-3 gap-4">
                    <div className="text-xs text-gray-500 font-space tracking-wide">
                        PAGE <span className="font-bold text-[#00D2FF]">{page}</span> OF <span className="font-bold text-white">{totalPages}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={!hasPreviousPage}
                            onClick={onPreviousPage}
                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-[#00D2FF]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((pageNum, idx) => (
                                pageNum === '...' ? (
                                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-600">...</span>
                                ) : (
                                    <button
                                        key={pageNum}
                                        onClick={() => onGoToPage(pageNum as number)}
                                        className={`min-w-[32px] h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                                            page === pageNum
                                                ? 'bg-[#00D2FF] text-[#020617] shadow-[0_0_15px_rgba(0,210,255,0.3)]'
                                                : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
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
                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-[#00D2FF]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                             <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}