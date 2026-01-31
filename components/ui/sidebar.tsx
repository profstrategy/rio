"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Trophy, CheckSquare, HelpCircle, LogOut, User as UserIcon, X } from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

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
    <div className="h-full flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-0" />
      
        {/* 1. Logo Section with Glow */}
        <div className="flex items-center justify-between px-8 pt-10 pb-8">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-neon-cyan blur-lg opacity-40 rounded-full"></div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue relative z-10 flex items-center justify-center shadow-neon">
                        <img src="/logo.jpg" className="w-8 h-8 rounded-xl" alt="Logo" />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-wide">DreamCoin</h1>
                    <p className="text-[10px] text-neon-cyan uppercase tracking-[0.2em] font-semibold">Dashboard</p>
                </div>
            </div>
            {/* Close Button (Mobile Only) */}
            <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        {/* 2. Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
                <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={clsx(
                    "w-full relative flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group",
                    isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
                >
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-transparent rounded-xl border border-neon-blue/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]" />
                )}

                <item.icon
                    size={22}
                    className={clsx(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-neon-pulse drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "group-hover:text-white"
                    )}
                />
                <span className={clsx("relative z-10 font-medium tracking-wide", isActive ? "font-bold" : "")}>
                    {item.name}
                </span>
                </button>
            );
            })}
        </nav>

        {/* 3. User Profile at Bottom */}
        <div className="p-4 mt-auto">
            <div className="glass-card p-4 flex items-center gap-3 bg-black/40 border-white/5">
                {user?.avatarUrl ? (
                <img 
                    src={user.avatarUrl} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border-2 border-neon-cyan/30 shadow-neon"
                />
                ) : (
                <div className="w-10 h-10 rounded-full bg-obsidian-800 border border-white/10 flex items-center justify-center text-xs text-gray-400">
                    <UserIcon size={20} />
                </div>
                )}
                
                <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                    {user?.username || "Dreamer"}
                </p>
                <p className="text-xs text-neon-cyan font-mono">
                    {user?.dreamPoints?.toLocaleString() || 0} PTS
                </p>
                </div>

                <button onClick={() => signOut({ callbackUrl: '/' })} className="text-gray-500 hover:text-red-400 transition-colors">
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <>
        {/* DESKTOP SIDEBAR (Hidden on mobile, Flex on MD) */}
        <aside className="w-72 h-[96vh] fixed left-4 top-[2vh] hidden md:flex flex-col rounded-3xl z-40 glass-panel overflow-hidden">
            {SidebarContent}
        </aside>

        {/* MOBILE DRAWER (AnimatePresence handles the slide-in/out) */}
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                    />
                    
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 bottom-0 left-0 w-[85%] max-w-sm bg-[#050818] z-50 border-r border-white/10 md:hidden"
                    >
                        {SidebarContent}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    </>
  );
}