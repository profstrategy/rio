import { prisma } from "@/lib/prisma";
import { Trash2, Users, Zap, UserPlus, ShieldAlert, BadgeCheck } from "lucide-react";
import { deleteUser } from "../../actions/admin";

export default async function AdminUsersPage() {
  // Fetch users with their referral count and completion count
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { 
            referrals: true, 
            completions: true 
        }
      }
    }
  });

  // Calculate quick stats
  const totalPoints = users.reduce((acc, user) => acc + user.dreamPoints, 0);
  const totalReferrals = users.reduce((acc, user) => acc + user._count.referrals, 0);

  // --- STYLES ---
  const styles = {
    glassCard: "bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-[24px]",
    th: "p-5 text-[#00D2FF] font-sync font-bold text-[10px] uppercase tracking-[0.2em]",
    td: "p-5 border-b border-white/5"
  };

  return (
    <div className="space-y-8">
      
      {/* 1. HUD STATS (Heads Up Display) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Dreamers */}
        <div className={`${styles.glassCard} p-6 flex items-center justify-between relative overflow-hidden group`}>
           <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users size={80} className="text-white" />
           </div>
           <div>
              <p className="text-gray-400 text-[10px] font-sync font-bold uppercase tracking-widest mb-2">Total Dreamers</p>
              <p className="text-3xl font-space font-bold text-white">{users.length}</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-[#020617] flex items-center justify-center border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]">
             <Users size={20} />
           </div>
        </div>

        {/* Card 2: Points Distributed */}
        <div className={`${styles.glassCard} p-6 flex items-center justify-between relative overflow-hidden group`}>
           <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={80} className="text-[#00D2FF]" />
           </div>
           <div>
              <p className="text-gray-400 text-[10px] font-sync font-bold uppercase tracking-widest mb-2">Points Distributed</p>
              <p className="text-3xl font-space font-bold text-[#00D2FF] drop-shadow-[0_0_10px_rgba(0,210,255,0.3)]">
                {totalPoints.toLocaleString()}
              </p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/10 flex items-center justify-center border border-[#00D2FF]/30 text-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.2)]">
             <Zap size={20} />
           </div>
        </div>

        {/* Card 3: Growth */}
        <div className={`${styles.glassCard} p-6 flex items-center justify-between relative overflow-hidden group`}>
           <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <UserPlus size={80} className="text-[#3AFFAD]" />
           </div>
           <div>
              <p className="text-gray-400 text-[10px] font-sync font-bold uppercase tracking-widest mb-2">Growth (Invites)</p>
              <p className="text-3xl font-space font-bold text-[#3AFFAD] drop-shadow-[0_0_10px_rgba(58,255,173,0.3)]">
                {totalReferrals}
              </p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-[#3AFFAD]/10 flex items-center justify-center border border-[#3AFFAD]/30 text-[#3AFFAD] shadow-[0_0_20px_rgba(58,255,173,0.2)]">
             <UserPlus size={20} />
           </div>
        </div>

      </div>

      {/* 2. THE HOLOGRAPHIC TABLE */}
      <div className={`${styles.glassCard} overflow-hidden relative border border-white/5`}>
        
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-[#00D2FF]/5 blur-[60px] pointer-events-none" />

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#020617]/50">
                <th className={`${styles.th} pl-8`}>Identity</th>
                <th className={styles.th}>Score (PTS)</th>
                <th className={styles.th}>Clearance</th>
                <th className={`${styles.th} text-center`}>Referrals</th>
                <th className={`${styles.th} text-center`}>Missions</th>
                <th className={styles.th}>Registered</th>
                <th className={`${styles.th} text-right pr-8`}>Protocol</th>
              </tr>
            </thead>
            
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors duration-200">
                  
                  {/* USER IDENTITY */}
                  <td className={`${styles.td} pl-8`}>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                          <img 
                            src={user.avatarUrl || "/default-avatar.png"} 
                            alt="avatar" 
                            className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-[#00D2FF]/50 transition-colors bg-[#020617] object-cover"
                          />
                          {/* Active Dot */}
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#3AFFAD] border-2 border-[#020617] rounded-full shadow-[0_0_5px_#3AFFAD]"></div>
                      </div>
                      <div>
                        <p className="font-bold font-space text-white text-sm group-hover:text-[#00D2FF] transition-colors flex items-center gap-1">
                            {user.username || "Unknown"}
                            {user.currentLevel === "Level 2" && <BadgeCheck size={12} className="text-[#00D2FF]" />}
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono tracking-wide">{user.twitterId}</p>
                      </div>
                    </div>
                  </td>

                  {/* POINTS */}
                  <td className={styles.td}>
                    <span className="font-mono text-[#00D2FF] font-bold">
                        {user.dreamPoints.toLocaleString()}
                    </span>
                  </td>

                  {/* LEVEL */}
                  <td className={styles.td}>
                    <span className="text-[10px] font-sync font-bold border border-white/10 bg-white/5 px-2 py-1 rounded text-gray-400 uppercase tracking-wider group-hover:text-white group-hover:border-white/30 transition-colors">
                      {user.currentLevel}
                    </span>
                  </td>

                  {/* REFERRALS */}
                  <td className={`${styles.td} text-center`}>
                    {user._count.referrals > 0 ? (
                        <span className="text-[#3AFFAD] font-bold font-space">{user._count.referrals}</span>
                    ) : (
                        <span className="text-gray-600">-</span>
                    )}
                  </td>

                   {/* TASKS */}
                   <td className={`${styles.td} text-center`}>
                    <span className="text-gray-300 font-mono">{user._count.completions}</span>
                  </td>

                  {/* DATE */}
                  <td className={`${styles.td} text-xs text-gray-500 font-mono`}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* DELETE ACTION */}
                  <td className={`${styles.td} text-right pr-8`}>
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={user.id} />
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 bg-white/5 border border-white/5 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all" 
                        title="Ban User (Irreversible)"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <ShieldAlert size={40} className="mb-4 opacity-20" />
                <p className="uppercase font-sync tracking-widest text-xs">Database Empty</p>
            </div>
        )}
      </div>
    </div>
  );
}