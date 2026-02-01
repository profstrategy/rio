import { Trophy, Zap, Target, Flame, ArrowRight, TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDashboardData } from "../actions/user";

export default async function Dashboard() {
  const user = await getDashboardData();
  if (!user) redirect("/");

  // 1. RUN PARALLEL QUERIES FOR SPEED
  const [recentActivity, totalTasks, completedCount] = await Promise.all([
    prisma.taskCompletion.findMany({
      where: { userId: user.id },
      include: { task: true },
      orderBy: { completedAt: 'desc' },
      take: 5,
    }),
    prisma.task.count(),
    prisma.taskCompletion.count({
      where: { userId: user.id },
    })
  ]);

  // Calculate Progress
  const nextLevelPoints = 1000; 
  const progressPercent = Math.min((user.dreamPoints / nextLevelPoints) * 100, 100);
  const tasksRemaining = totalTasks - completedCount;

  // --- REUSABLE STAT CARD FOR RIO THEME ---
  const RioStatCard = ({ label, value, subValue, icon: Icon, colorClass = "text-[#00D2FF]", bgGlow = "bg-[#00D2FF]/10" }: any) => (
    <div className="group relative overflow-hidden rounded-[24px] bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]">
       {/* Hover Gradient */}
       <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-transparent to-${colorClass.split('-')[1] || 'blue'}-500/5 pointer-events-none`} />
       
       <div className="relative z-10">
         <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${bgGlow} border border-white/5 ${colorClass} shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform`}>
              <Icon size={24} />
            </div>
            {/* Optional Trend Indicator */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-[#3AFFAD]">
                <TrendingUp size={12} />
                <span>Active</span>
            </div>
         </div>
         <div>
            <h4 className="text-[10px] font-sync font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">{label}</h4>
            <div className="font-space font-bold text-2xl text-white tracking-tight">{value}</div>
            <p className="text-xs text-gray-500 font-space mt-1">{subValue}</p>
         </div>
       </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in-up font-space">
      
      {/* 1. HEADER & STREAK */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-sync text-white tracking-tight mb-2 uppercase">
            Overview
          </h1>
          <p className="text-gray-400 font-medium">
            System Online. Welcome back, <span className="text-[#00D2FF] font-bold">{user.username}</span>.
          </p>
        </div>
        
        {/* Luxury Streak Card */}
        <div className="relative group overflow-hidden rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-orange-500/30 px-6 py-4 flex items-center gap-4 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]">
           <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-50" />
           
           <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
             <Flame className="text-orange-500 animate-pulse" fill="currentColor" size={20} />
           </div>
           
           <div className="relative z-10">
             <p className="text-[9px] font-sync font-bold text-orange-400 uppercase tracking-widest mb-0.5">Daily Streak</p>
             <p className="text-2xl font-bold text-white font-space leading-none">{user.streakCount} <span className="text-sm text-gray-500">Days</span></p>
           </div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RioStatCard 
          label="Dream Points" 
          value={user.dreamPoints.toLocaleString()} 
          subValue="Keep Believing"
          icon={Zap}
          colorClass="text-[#00D2FF]"
          bgGlow="bg-[#00D2FF]/10"
        />
        <RioStatCard 
          label="Current Tier" 
          value={user.currentLevel} 
          subValue="Top 15% of Dreamers"
          icon={Trophy} 
          colorClass="text-purple-400"
          bgGlow="bg-purple-500/10"
        />
        <RioStatCard 
          label="Quests Done" 
          value={`${completedCount} / ${totalTasks}`} 
          subValue={tasksRemaining === 0 ? "All Systems Go!" : `${tasksRemaining} Quests Pending`}
          icon={Target} 
          colorClass="text-[#3AFFAD]"
          bgGlow="bg-[#3AFFAD]/10"
        />
      </div>

      {/* 3. MILESTONE & ACTIONS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Next Milestone (The "Hero" Card) */}
        <div className="lg:col-span-2 relative rounded-[30px] overflow-hidden group border border-white/5 bg-[#0f172a]/60 backdrop-blur-xl p-8">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00D2FF]/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h3 className="text-xl font-bold font-sync text-white mb-2 uppercase tracking-wide">Next Phase: Awakening</h3>
                <p className="text-gray-400 text-sm">Accumulate <span className="text-[#00D2FF] font-bold">{nextLevelPoints - user.dreamPoints} PTS</span> to unlock Level 3 clearance.</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold font-space text-white drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">
                  {Math.round(progressPercent)}%
                </span>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Upload Complete</p>
              </div>
            </div>
            
            {/* Luxury Progress Bar */}
            <div className="h-3 w-full bg-[#020617] rounded-full overflow-hidden border border-white/10 relative">
              <div 
                className="h-full bg-gradient-to-r from-[#00D2FF] to-[#3AFFAD] shadow-[0_0_20px_rgba(0,210,255,0.5)] relative transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-0 h-full w-[2px] bg-white opacity-50 shadow-[0_0_10px_white]" />
              </div>
            </div>

            <div className="mt-8">
               <Link href="/user-task/dashboard/tasks" className="inline-flex items-center justify-center px-8 py-3 bg-[#00D2FF] text-[#020617] font-bold font-sync uppercase tracking-widest rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                 Initialize Quests
               </Link>
            </div>
        </div>

        {/* Rewards / Coming Soon */}
        <div className="relative rounded-[30px] overflow-hidden border border-white/5 bg-[#0f172a]/60 backdrop-blur-xl p-8 flex flex-col justify-center">
           <div className="absolute inset-0 bg-gradient-to-br from-[#00D2FF]/5 to-transparent pointer-events-none" />
           
           <div className="relative z-10">
             <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
               <Trophy className="text-yellow-500" size={28} />
             </div>
             
             <h3 className="text-lg font-bold font-sync text-white uppercase tracking-wide">Airdrop Alpha</h3>
             <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Top rankers secure <span className="text-[#3AFFAD] font-bold">300k - 500k</span> $RIO allocation.
             </p>
             
             <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Ends in 48h
                </span>
                <Link href="/user-task/dashboard/leaderboard" className="text-[#00D2FF] text-xs font-bold font-sync uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all hover:text-white">
                  View Board <ArrowRight size={14} />
                </Link>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}