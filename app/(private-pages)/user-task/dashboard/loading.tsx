"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center relative">
      
      {/* Background Ambience (Optional) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-64 h-64 bg-[#00D2FF]/5 rounded-full blur-[80px] animate-pulse" />
      </div>

      {/* 1. The RIO Reactor Spinner */}
      <div className="relative w-24 h-24">
        
        {/* Outer Ring: Slow Clockwise Spin (Rio Blue) */}
        <div 
          className="absolute inset-0 rounded-full border-[2px] border-t-[#00D2FF] border-r-transparent border-b-[#00D2FF]/30 border-l-transparent shadow-[0_0_20px_rgba(0,210,255,0.4)] animate-[spin_1.5s_linear_infinite]"
        />

        {/* Inner Ring: Fast Counter-Clockwise Spin (Rio Green) */}
        <div 
          className="absolute inset-3 rounded-full border-[2px] border-t-transparent border-r-[#3AFFAD] border-b-transparent border-l-[#3AFFAD]/50 animate-[spin_0.7s_linear_infinite_reverse] shadow-[0_0_15px_rgba(58,255,173,0.3)]"
        />

        {/* The Core: Breathing Energy */}
        <div 
          className="absolute inset-8 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#3AFFAD] blur-md animate-pulse opacity-80"
        />
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white] animate-ping" />
        </div>
      </div>

      {/* 2. System Status Text */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <h3 className="text-white font-sync font-bold text-sm tracking-[0.2em] uppercase animate-pulse">
          Establishing Uplink
        </h3>
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#3AFFAD] rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-[#3AFFAD] rounded-full animate-bounce delay-75"></span>
            <span className="w-1.5 h-1.5 bg-[#3AFFAD] rounded-full animate-bounce delay-150"></span>
        </div>
        <p className="text-[#00D2FF]/60 text-[10px] font-space font-bold uppercase tracking-widest">
          Decrypting RIO Protocol...
        </p>
      </div>

    </div>
  );
}