import { DashboardCardProps } from "@/constants/types";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu"; // Assuming these are your shadcn/ui imports
import { Clock } from "lucide-react"; // Added icon for the time window

const DashboardCard = ({ title, children, delay = 0, height = 'h-full', activityWindow }: DashboardCardProps) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-[30px] p-6 ${height} transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,210,255,0.15)] hover:-translate-y-1`}
      style={{
        // Dark Glass background
        background: 'rgba(15, 23, 42, 0.6)', 
        // Subtle white border that gets stronger on hover via CSS classes below, 
        // but keeping inline styles for the base structure if you prefer.
        // We handle the main styling via Tailwind classes for better responsiveness.
        animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s both`,
      }}
    >
      {/* 1. Glass Borders & Glows (Tailwind) */}
      <div className="absolute inset-0 rounded-[30px] border border-white/5 group-hover:border-[#00D2FF]/30 transition-colors duration-500 pointer-events-none z-20"></div>
      
      {/* 2. Background Decorative Blob (Updated to RIO Blue) */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00D2FF 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className={`${activityWindow && 'w-full flex justify-between items-center'} mb-6`}>
          
          {/* Title */}
          <h3 className="text-sm md:text-base font-sync font-bold uppercase tracking-[0.15em] text-white group-hover:text-[#00D2FF] transition-colors duration-300 shadow-black drop-shadow-md">
            {title}
          </h3>

          {/* Activity Window / Dropdown Area */}
          {activityWindow && (
            <div className="flex items-center">
                {/* Preserving your original logic structure, but styling it 
                   to look like a high-tech badge/selector 
                */}
                <DropdownMenu>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-[10px] font-bold font-space uppercase tracking-wider cursor-pointer hover:bg-[#00D2FF]/20 transition-all">
                       <Clock className="w-3 h-3" />
                       {/* This maps the window string as requested, usually this would be a Trigger */}
                       {Array.from(activityWindow).map((window, i) => (
                           <span key={i}>{window}</span>
                       ))}
                    </div>
                    {/* Note: DropdownMenuContent usually needs a Trigger. 
                       Assuming your DropdownMenu component handles children implicitly.
                    */}
                    <DropdownMenuContent className="bg-[#020617] border border-white/10 text-white font-space">
                       {/* Content would go here */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex-1 font-space text-gray-400">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard