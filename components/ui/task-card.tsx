"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ExternalLink, Loader2, Play, Clock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { claimTask } from "@/app/(private-pages)/user-task/actions/tasks";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  actionUrl: string | null;
  category: string; 
  isCompleted: boolean;
}

export default function TaskCard({ id, title, description, rewardPoints, actionUrl, category, isCompleted }: TaskProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(isCompleted ? "COMPLETED" : "IDLE");
  const router = useRouter();

  const handleStart = () => {
    if (actionUrl && (actionUrl.startsWith('http') || actionUrl.startsWith('https'))) {
      window.open(actionUrl, '_blank');
    }
    
    setLoading(true);
    // Simulate "verifying" delay
    setTimeout(() => {
      setLoading(false);
      setStatus("READY_TO_CLAIM");
    }, 3000);
  };

  const handleClaim = async () => {
    setLoading(true);
    
    const result = await claimTask(id);
    
    if (result.success) {
      setStatus("COMPLETED");
      router.refresh(); 
    } else {
        alert("Error: " + (result.error || "Could not claim"));
    }
    setLoading(false);
  };

  // --- 1. COMPLETED STATE (With Countdown Logic) ---
  if (status === "COMPLETED") {
    return (
      <div className="relative overflow-hidden rounded-[20px] p-5 bg-[#0f172a]/40 border border-[#3AFFAD]/20 flex flex-col md:flex-row items-center justify-between gap-4 group">
        
        {/* Subtle Green Glow Background */}
        <div className="absolute inset-0 bg-[#3AFFAD]/5 opacity-50 pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="p-2.5 bg-[#3AFFAD]/10 border border-[#3AFFAD]/30 rounded-full text-[#3AFFAD] shadow-[0_0_15px_rgba(58,255,173,0.2)]">
            <CheckCircle size={20} />
          </div>
          <div>
            <h4 className="text-gray-400 font-sync font-medium text-sm line-through uppercase tracking-wide opacity-70">{title}</h4>
            <p className="text-xs text-[#3AFFAD] font-bold font-space flex items-center gap-1 mt-1">
               <Sparkles size={10} /> Completed (+{rewardPoints} pts)
            </p>
          </div>
        </div>

        {/* SHOW COUNTDOWN IF DAILY */}
        {category === "Daily" && (
            <div className="relative z-10 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock size={12} className="text-[#00D2FF]" />
                <CountdownTimer />
            </div>
        )}
      </div>
    );
  }

  // --- 2. ACTIVE STATE ---
  return (
    <div className="group relative overflow-hidden rounded-[24px] bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 p-6 transition-all duration-300 hover:border-[#00D2FF]/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        
        <div className="flex items-start gap-5">
           {/* Reward Badge */}
           <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.15)] group-hover:scale-105 transition-transform duration-300">
               <span className="font-space font-bold text-lg text-[#00D2FF]">+{rewardPoints}</span>
           </div>

           <div>
              <h4 className="text-base md:text-lg font-bold font-sync text-white uppercase tracking-wide group-hover:text-[#00D2FF] transition-colors">
                  {title}
              </h4>
              <p className="text-sm text-gray-400 mt-1 font-space leading-relaxed max-w-lg">
                  {description}
              </p>
           </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
           {/* IDLE: Start Button */}
           {status === "IDLE" && !loading && (
             <button 
               onClick={handleStart}
               className="px-6 py-2.5 bg-white/5 hover:bg-[#00D2FF] border border-white/10 hover:border-[#00D2FF] rounded-xl text-xs font-bold font-sync uppercase tracking-widest text-gray-300 hover:text-[#020617] transition-all flex items-center gap-2 group/btn"
             >
               {(actionUrl && actionUrl.startsWith('http')) ? (
                   <>Link <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" /></>
               ) : (
                   <>Start <Play size={14} className="group-hover/btn:translate-x-0.5 transition-transform" /></>
               )}
             </button>
           )}

           {/* LOADING SPINNER */}
           {status === "IDLE" && loading && (
               <div className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                 <Loader2 className="animate-spin text-[#00D2FF]" size={18} />
                 <span className="text-[10px] uppercase font-bold text-[#00D2FF] animate-pulse">Verifying...</span>
               </div>
           )}

           {/* READY TO CLAIM */}
           {status === "READY_TO_CLAIM" && (
              <button 
                onClick={handleClaim}
                disabled={loading}
                className="px-6 py-3 bg-[#3AFFAD] text-[#020617] font-bold font-sync uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(58,255,173,0.4)] hover:shadow-[0_0_30px_rgba(58,255,173,0.6)] hover:scale-105 transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Claim Reward"}
              </button>
           )}
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENT: COUNTDOWN TIMER (Styled) ---
function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            // Calculate Next Midnight (Local Time)
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0); 

            const diff = midnight.getTime() - now.getTime();

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            // Pad with zeros for digital clock look
            const pad = (n: number) => n.toString().padStart(2, '0');
            setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
        };

        updateTimer(); 
        const interval = setInterval(updateTimer, 1000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="text-[10px] font-mono font-bold text-gray-400">
            RESET: <span className="text-white tracking-widest">{timeLeft}</span>
        </span>
    );
}