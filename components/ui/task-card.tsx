"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ExternalLink, Loader2, Play, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { claimTask } from "@/app/(private-pages)/user-task/actions/tasks";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  actionUrl: string | null;
  category: string; // Added Category to check if it's "Daily"
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

  // 1. COMPLETED STATE (With Countdown Logic)
  if (status === "COMPLETED") {
    return (
      <div className="glass-card p-5 border-green-500/20 bg-green-900/10 flex flex-col md:flex-row items-center justify-between opacity-80 hover:opacity-100 transition-all gap-4">
        
        <div className="flex items-center gap-5">
          <div className="p-2 bg-green-500/10 rounded-full text-green-400">
            <CheckCircle size={24} />
          </div>
          <div>
            <h4 className="text-gray-300 font-medium line-through">{title}</h4>
            <p className="text-xs text-green-400">Completed (+{rewardPoints} pts)</p>
          </div>
        </div>

        {/* SHOW COUNTDOWN IF DAILY */}
        {category === "Daily" && (
            <div className="bg-black/30 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <CountdownTimer />
            </div>
        )}

      </div>
    );
  }

  // 2. ACTIVE STATE
  return (
    <div className="glass-card p-6 flex items-center justify-between group relative overflow-hidden">
      
      <div className="flex items-center gap-5 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-obsidian-800 to-obsidian-950 border border-white/10 flex items-center justify-center text-neon-cyan shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-300">
           <span className="font-bold text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">+{rewardPoints}</span>
        </div>
        
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">{title}</h4>
          <p className="text-sm text-gray-400 mt-1 max-w-md">{description}</p>
        </div>
      </div>

      <div className="shrink-0 relative z-10">
        {status === "IDLE" && (
          <button 
            onClick={handleStart}
            className="px-5 py-2.5 bg-white/5 hover:bg-neon-blue/10 border border-white/10 hover:border-neon-blue/30 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-all flex items-center gap-2"
          >
            {(actionUrl && actionUrl.startsWith('http')) ? <>Open <ExternalLink size={16} /></> : <>Start <Play size={16} /></>}
          </button>
        )}

        {status === "IDLE" && loading && (
           <button disabled className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl">
             <Loader2 className="animate-spin text-neon-cyan" size={20} />
           </button>
        )}

        {status === "READY_TO_CLAIM" && (
           <button 
             onClick={handleClaim}
             disabled={loading}
             className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-extrabold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-pulse hover:scale-105 transition-all"
           >
             {loading ? <Loader2 className="animate-spin" size={20} /> : "CLAIM REWARD"}
           </button>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: COUNTDOWN TIMER ---
function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            // Calculate Next Midnight (Local Time)
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0); // Sets time to 00:00:00 of the next day

            const diff = midnight.getTime() - now.getTime();

            // Calculate hours, mins, secs
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        updateTimer(); // Run immediately
        const interval = setInterval(updateTimer, 1000); // Run every second

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="text-xs font-mono text-gray-400">
            Next: <span className="text-white font-bold">{timeLeft}</span>
        </span>
    );
}