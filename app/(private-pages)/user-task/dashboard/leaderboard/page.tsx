import { getLeaderboard } from "@/actions/leaderboard";
import { getDashboardData } from "@/actions/user";
import { Crown } from "lucide-react";
import TierBadge from "@/components/ui/TierBadge";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();
  const currentUser = await getDashboardData();

  return (
    <div className="space-y-8 pb-10">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-white mb-2">Realm of Dreamers</h1>
        <p className="text-gray-400">The elite believers shaping the future.</p>
      </div>

      {/* THE LUXURY TABLE CONTAINER */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
        
        {/* Glow effect behind top rows */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neon-blue/10 to-transparent pointer-events-none" />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-xs font-bold uppercase tracking-widest">
                <th className="p-6 pl-8">Rank</th>
                <th className="p-6">Dreamer</th>
                <th className="p-6 text-center">Tier</th>
                <th className="p-6 text-right pr-8">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboard.map((user, index) => {
                const rank = index + 1;
                const isMe = user.id === currentUser?.id;
                
                // Special styling for Top 3
                let rankStyle = "text-gray-400 font-mono";
                let rowBg = "hover:bg-white/5 transition-colors";
                
                if (rank === 1) { rankStyle = "text-yellow-400 font-bold text-lg drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"; rowBg = "bg-gradient-to-r from-yellow-500/10 to-transparent border-l-2 border-yellow-500"; }
                else if (rank === 2) { rankStyle = "text-gray-300 font-bold text-lg"; rowBg = "bg-gradient-to-r from-gray-400/10 to-transparent"; }
                else if (rank === 3) { rankStyle = "text-orange-400 font-bold text-lg"; rowBg = "bg-gradient-to-r from-orange-700/10 to-transparent"; }
                
                if (isMe) { rowBg = "bg-neon-cyan/10 border-l-2 border-neon-cyan shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]"; }

                return (
                  <tr key={user.id} className={rowBg}>
                    
                    {/* RANK */}
                    <td className="p-6 pl-8">
                      <div className="flex items-center gap-3">
                        <span className={rankStyle}>#{rank}</span>
                        {rank === 1 && <Crown className="text-yellow-400 w-5 h-5 animate-pulse" fill="currentColor" />}
                      </div>
                    </td>

                    {/* USER */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full p-0.5 ${rank <= 3 ? 'bg-gradient-to-br from-white/50 to-transparent' : 'border border-white/10'}`}>
                           <img 
                             src={user.avatarUrl || "/default-avatar.png"} 
                             alt={user.username || "User"} 
                             className="w-full h-full rounded-full object-cover bg-obsidian-950"
                           />
                        </div>
                        <div>
                          <p className={`font-bold ${isMe ? "text-neon-cyan" : "text-white"}`}>
                            {user.username} {isMe && "(You)"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* TIER BADGE */}
                    <td className="p-6 text-center">
                       <TierBadge tier={user.currentLevel} />
                    </td>

                    {/* POINTS */}
                    <td className="p-6 pr-8 text-right">
                      <span className={`font-mono font-bold text-lg ${rank <= 3 ? 'text-white' : 'text-gray-300'}`}>
                        {user.dreamPoints.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {leaderboard.length === 0 && (
            <div className="p-12 text-center text-gray-500">The realm is quiet...</div>
        )}
      </div>
    </div>
  );
}