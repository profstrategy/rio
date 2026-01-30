"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

interface DashboardWrapperProps {
  children: React.ReactNode;
  user: any; // Passed from the server layout
}

export default function DashboardWrapper({ children, user }: DashboardWrapperProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-neon-cyan/30 relative">
      
      {/* 1. MOBILE HEADER (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center shadow-neon">
                <img src="/logo.jpg" className="w-5 h-5 rounded" />
            </div>
            <span className="font-bold text-white tracking-widest text-lg">DREAM</span>
         </div>
         <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
         >
            <Menu size={24} />
         </button>
      </div>

      {/* 2. SIDEBAR (Controls passed down) */}
      <Sidebar user={user} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 3. MAIN CONTENT AREA */}
      {/* md:pl-80 pushes content right on desktop to clear the fixed sidebar */}
      {/* pt-20 pushes content down on mobile to clear the header */}
      <div className="md:pl-80 transition-all duration-300 w-full min-h-screen">
        <main className="px-4 pt-24 pb-24 md:p-10 md:pt-10 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}