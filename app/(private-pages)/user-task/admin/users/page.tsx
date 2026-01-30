import { prisma } from "@/lib/prisma";
import { Trash2, Users, Zap, UserPlus, ShieldAlert } from "lucide-react";
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

  return (
    <div className="space-y-8">
      
      {/* 1. HUD STATS (Heads Up Display) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users size={60} />
           </div>
           <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Dreamers</p>
              <p className="text-3xl font-bold text-white">{users.length}</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             <Users size={20} />
           </div>
        </div>

        <div className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 text-neon-cyan group-hover:opacity-20 transition-opacity">
              <Zap size={60} />
           </div>
           <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Points Distributed</p>
              <p className="text-3xl font-bold text-neon-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {totalPoints.toLocaleString()}
              </p>
           </div>
           <div className="w-10 h-10 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20 text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]">
             <Zap size={20} />
           </div>
        </div>

        <div className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 text-green-400 group-hover:opacity-20 transition-opacity">
              <UserPlus size={60} />
           </div>
           <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Growth (Invites)</p>
              <p className="text-3xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                {totalReferrals}
              </p>
           </div>
           <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
             <UserPlus size={20} />
           </div>
        </div>

      </div>

      {/* 2. THE HOLOGRAPHIC TABLE */}
      <div className="glass-panel rounded-2xl overflow-hidden relative border border-white/5">
        
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-neon-blue/10 blur-[60px] pointer-events-none" />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-black/20 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <th className="p-5 pl-8">Identity</th>
                <th className="p-5">Score (PTS)</th>
                <th className="p-5">Clearance</th>
                <th className="p-5 text-center">Referrals</th>
                <th className="p-5 text-center">Missions</th>
                <th className="p-5">Registered</th>
                <th className="p-5 text-right pr-8">Protocol</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-white/5 transition-colors duration-200">
                  
                  {/* USER IDENTITY */}
                  <td className="p-5 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                          <img 
                            src={user.avatarUrl || "/default-avatar.png"} 
                            alt="avatar" 
                            className="w-10 h-10 rounded-full border border-white/10 group-hover:border-neon-cyan/50 transition-colors bg-obsidian-950 object-cover"
                          />
                          {/* Active Dot */}
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-obsidian-900 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm group-hover:text-neon-cyan transition-colors">{user.username || "Unknown"}</p>
                        <p className="text-[10px] text-gray-500 font-mono tracking-wide">{user.twitterId}</p>
                      </div>
                    </div>
                  </td>

                  {/* POINTS */}
                  <td className="p-5">
                    <span className="font-mono text-neon-cyan font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
                        {user.dreamPoints.toLocaleString()}
                    </span>
                  </td>

                  {/* LEVEL */}
                  <td className="p-5">
                    <span className="text-[10px] border border-white/10 bg-white/5 px-2 py-1 rounded text-gray-300 uppercase tracking-wider group-hover:border-white/30 transition-colors">
                      {user.currentLevel}
                    </span>
                  </td>

                  {/* REFERRALS */}
                  <td className="p-5 text-center">
                    {user._count.referrals > 0 ? (
                        <span className="text-green-400 font-bold">{user._count.referrals}</span>
                    ) : (
                        <span className="text-gray-600">-</span>
                    )}
                  </td>

                   {/* TASKS */}
                   <td className="p-5 text-center">
                    <span className="text-gray-300 font-mono">{user._count.completions}</span>
                  </td>

                  {/* DATE */}
                  <td className="p-5 text-xs text-gray-500 font-mono">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* DELETE ACTION */}
                  <td className="p-5 text-right pr-8">
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={user.id} />
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all" 
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
                <p className="uppercase tracking-widest text-xs">Database Empty</p>
            </div>
        )}
      </div>
    </div>
  );
}