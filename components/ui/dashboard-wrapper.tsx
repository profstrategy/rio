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
    <div className="min-h-screen bg-[#020617] text-white font-space selection:bg-[#00D2FF]/30 relative overflow-x-hidden">
      
      {/* Background Ambience (Fixed so it stays while scrolling) */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00D2FF]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3AFFAD]/5 rounded-full blur-[120px]" />
      </div>

      {/* 1. MOBILE HEADER (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-20 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 transition-all duration-300">
         <div className="flex items-center gap-3">
            {/* Logo Container */}
            <div className="w-10 h-10 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                {/* Replace src with your actual RIO logo path */}
                <img src="/logo.png" alt="RIO" className="w-full h-full object-cover rounded-full opacity-90" />
            </div>
            <span className="font-sync font-bold text-white tracking-tighter text-xl">$RIO</span>
         </div>
         
         <button 
           onClick={() => setSidebarOpen(true)} 
           className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10 active:scale-95"
         >
            <Menu size={24} />
         </button>
      </div>

      {/* 2. SIDEBAR (Controls passed down) */}
      {/* Ensure your Sidebar component also uses 'fixed' positioning and high z-index */}
      <Sidebar user={user} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 3. MAIN CONTENT AREA */}
      {/* relative z-10 ensures content sits above the background blobs */}
      <div className="md:pl-80 transition-all duration-300 w-full min-h-screen relative z-10">
        <main className="px-4 pt-28 pb-12 md:p-10 md:pt-10 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}