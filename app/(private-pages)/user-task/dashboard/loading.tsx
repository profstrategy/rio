"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center relative">
      
      {/* 1. The Spinning Rings (Pure CSS Animation) */}
      <div className="relative w-24 h-24">
        
        {/* Outer Ring: Slow Clockwise Spin (3s) */}
        <div 
          className="absolute inset-0 rounded-full border-[1px] border-t-neon-cyan border-r-transparent border-b-neon-blue/30 border-l-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-[spin_1s_linear_infinite]"
        />

        {/* Inner Ring: Fast Counter-Clockwise Spin (1.5s) */}
        {/* We use 'reverse' in the animation definition to spin it backwards */}
        <div 
          className="absolute inset-2 rounded-full border-[1px] border-t-transparent border-r-neon-cyan/50 border-b-transparent border-l-neon-cyan/50 animate-[spin_0.5s_linear_infinite_reverse]"
        />

        {/* The Core: Breathing Light */}
        <div 
          className="absolute inset-8 rounded-full bg-neon-cyan blur-md animate-pulse"
        />
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>
      </div>

      {/* 2. Elegant Text with Fade In */}
      <div className="mt-8 flex flex-col items-center gap-2 animate-[pulse_2s_ease-in-out_infinite]">
        <h3 className="text-white text-lg font-light tracking-[0.2em] uppercase">
          Initializing
        </h3>
        <p className="text-neon-cyan/50 text-xs font-mono tracking-widest">
          SYNCING DREAM STATE...
        </p>
      </div>

    </div>
  );
}