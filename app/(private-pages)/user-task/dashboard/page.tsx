import { Trophy, Zap, Target, Flame, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDashboardData } from "../actions/user";
import StatCard from "@/components/ui/stat-card";

export default async function Dashboard() {
  const user = await getDashboardData();
  if (!user) redirect("/");


  // 1. RUN PARALLEL QUERIES FOR SPEED
  // We fetch User data, Recent History, Total Task Count, and User Completion Count all at once
  const [recentActivity, totalTasks, completedCount] = await Promise.all([
    // A. Get last 5 completed tasks for the log
    prisma.taskCompletion.findMany({
      where: { userId: user.id },
      include: { task: true },
      orderBy: { completedAt: 'desc' },
      take: 5,
    }),
    // B. Count ALL available tasks in the system
    prisma.task.count(),
    // C. Count how many THIS user has done
    prisma.taskCompletion.count({
      where: { userId: user.id },
    })
  ]);

  // Calculate Progress (Example logic: Level 2 is 1000 pts)
  const nextLevelPoints = 1000; 
  const progressPercent = Math.min((user.dreamPoints / nextLevelPoints) * 100, 100);

  // Calculate remaining tasks
  const tasksRemaining = totalTasks - completedCount;

  return (
    <div className="space-y-10 animate-fade-in-up">
      
      {/* 1. HEADER & STREAK */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            Overview
          </h1>
          <p className="text-gray-400 font-medium">
            Welcome back, <span className="text-white border-b border-neon-cyan/30 pb-0.5">{user.username}</span>. The dream waits for no one.
          </p>
        </div>
        
        {/* Luxury Streak Card */}
        <div className="glass-card px-6 py-3 flex items-center gap-4 bg-gradient-to-r from-obsidian-800 to-transparent border-neon-blue/20">
           <div className="relative">
             <div className="absolute inset-0 bg-orange-500 blur-lg opacity-40 rounded-full animate-pulse" />
             <Flame className="text-orange-500 relative z-10" fill="currentColor" size={24} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Daily Streak</p>
             <p className="text-xl font-bold text-white font-mono">{user.streakCount} Days</p>
           </div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Dream Points" 
          value={user.dreamPoints.toLocaleString()} 
          subValue="Keep Believing"
          icon={Zap} 
        />
        <StatCard 
          label="Current Tier" 
          value={user.currentLevel} 
          subValue="Top 15% of Dreamers"
          icon={Trophy} 
        />
        <StatCard 
          label="Tasks Completed" 
          value={`${completedCount} / ${totalTasks}`} 
          subValue={tasksRemaining === 0 ? "All Quests Done!" : `${tasksRemaining} Quests Remaining`}
          icon={Target} 
        />
      </div>

      {/* 3. MILESTONE & ACTIONS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Next Milestone (The "Hero" Card) */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-blue/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-end mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Next Milestone: Awakening</h3>
                <p className="text-gray-400">Earn <span className="text-neon-cyan font-bold">{nextLevelPoints - user.dreamPoints}</span> more points to unlock Level 3.</p>
              </div>
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neon-cyan to-neon-blue">
                {Math.round(progressPercent)}%
              </span>
            </div>
            
            {/* Luxury Progress Bar */}
            <div className="h-4 w-full bg-obsidian-950/50 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue shadow-[0_0_20px_rgba(6,182,212,0.5)] relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-0 h-full w-[2px] bg-white opacity-50 shadow-[0_0_10px_white]" />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
               <Link href="/dashboard/tasks" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
                 Go to Quests
               </Link>
            </div>
        </div>

        {/* Quick Activity / Coming Soon */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-obsidian-800 to-obsidian-900 opacity-50" />
           <div className="relative z-10">
             <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
               <Trophy className="text-yellow-500" size={24} />
             </div>
             <h3 className="text-xl font-bold text-white">Rewards</h3>
             <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                Top dream will receive <span className="text-neon-cyan"> 300,000 - 500,000 </span> Tokens airdrop.
             </p>
             <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-500">Ends in 2 days</span>
                <Link href="/dashboard/leaderboard" className="text-neon-cyan text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  View Board <ArrowRight size={14} />
                </Link>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}