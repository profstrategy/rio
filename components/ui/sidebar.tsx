"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Trophy, CheckSquare, HelpCircle, LogOut, User as UserIcon, X } from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";

interface SidebarProps {
  user?: {
    username: string | null;
    avatarUrl?: string | null;
    dreamPoints: number;
    currentLevel: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Overview", icon: Home, href: "/user-task/dashboard" },
  { name: "Tasks", icon: CheckSquare, href: "/user-task/dashboard/tasks" },
  { name: "Leaderboard", icon: Trophy, href: "/user-task/dashboard/leaderboard" },
  { name: "Referrals", icon: UserIcon, href: "/user-task/dashboard/refer" },
  { name: "Faqs", icon: HelpCircle, href: "/user-task/dashboard/faqs" },
];

export default function Sidebar({ user, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Handler for navigation
  const handleNavigation = (href: string) => {
    router.push(href);
    onClose(); 
  };

  // REUSABLE CONTENT (Used for both Desktop & Mobile)
  const SidebarContent = (
    <div className="h-full flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#00D2FF]/5 to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#3AFFAD]/5 to-transparent pointer-events-none z-0" />
      
        {/* 1. Logo Section */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6 relative z-10">
            <div className="flex items-center gap-3">
                <div className="relative group">
                    <div className="absolute inset-0 bg-[#00D2FF] blur-md opacity-20 rounded-xl group-hover:opacity-40 transition-opacity"></div>
                    <div className="w-10 h-10 rounded-xl bg-[#020617] border border-[#00D2FF]/50 relative z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                         {/* Ensure this path is correct for your project */}
                        <img src="/logo.png" className="w-6 h-6 object-contain" alt="Logo" />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-sync font-bold text-white tracking-wide">$RIO</h1>
                    <p className="text-[9px] text-[#00D2FF] uppercase tracking-[0.25em] font-bold font-space">Dashboard</p>
                </div>
            </div>
            {/* Close Button (Mobile Only) */}
            <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        {/* 2. Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto relative z-10 custom-scrollbar">
            {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
                <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={clsx(
                    "w-full relative flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group font-space",
                    isActive
                    ? "text-white bg-[#00D2FF]/10 border border-[#00D2FF]/30 shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
                >
                <item.icon
                    size={20}
                    className={clsx(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-[#00D2FF]" : "group-hover:text-white"
                    )}
                />
                <span className={clsx("relative z-10 tracking-wide text-sm", isActive ? "font-bold" : "font-medium")}>
                    {item.name}
                </span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF]" />
                )}
                </button>
            );
            })}
        </nav>

        {/* 3. User Profile at Bottom */}
        <div className="p-4 mt-auto relative z-10">
            <div className="p-4 flex items-center gap-3 bg-[#020617]/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg transition-all hover:border-[#3AFFAD]/30 group">
                {user?.avatarUrl ? (
                <img 
                    src={user.avatarUrl} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border-2 border-[#3AFFAD]/50 shadow-[0_0_10px_rgba(58,255,173,0.2)]"
                />
                ) : (
                <div className="w-10 h-10 rounded-full bg-[#3AFFAD]/10 border border-[#3AFFAD]/30 flex items-center justify-center text-[#3AFFAD]">
                    <UserIcon size={18} />
                </div>
                )}
                
                <div className="flex-1 min-w-0">
                <p className="text-xs font-bold font-sync text-white uppercase tracking-wider truncate">
                    {user?.username || "Dreamer"}
                </p>
                <p className="text-[10px] text-[#3AFFAD] font-mono font-bold tracking-wide">
                    {user?.dreamPoints?.toLocaleString() || 0} PTS
                </p>
                </div>

                <button 
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <LogOut size={16} />
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <>
        {/* DESKTOP SIDEBAR (Floating Glass Panel) */}
        <aside className="fixed left-6 top-6 bottom-6 w-72 hidden md:flex flex-col rounded-[30px] z-50 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {SidebarContent}
        </aside>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#020617]/90 backdrop-blur-sm z-50 md:hidden"
                    />
                    
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 bottom-0 left-0 w-[85%] max-w-xs bg-[#0f172a] z-50 border-r border-white/10 md:hidden shadow-[0_0_50px_rgba(0,210,255,0.1)]"
                    >
                        {SidebarContent}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    </>
  );
}