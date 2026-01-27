import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"
import { Clock } from "lucide-react"
import { ACTIVITY_WINDOWS } from "@/network/types"
import { DashboardCardProps } from "@/constants/types"

export const DashboardCard = ({
  title,
  children,
  delay = 0,
  height = 'h-full',
  activityWindow,
  onActivityWindowChange,
}: DashboardCardProps) => {
  return (
    <div className={`relative rounded-[30px] p-6 ${height}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          {title}
        </h3>

        {activityWindow && onActivityWindowChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-[10px] font-bold uppercase">
                <Clock className="w-3 h-3" />
                {activityWindow}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-[#020617] border border-white/10">
              {ACTIVITY_WINDOWS.map(window => (
                <DropdownMenuItem
                  key={window}
                  onClick={() => onActivityWindowChange(window)}
                  className="text-xs uppercase cursor-pointer text-white"
                >
                  {window}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {children}
    </div>
  )
}
