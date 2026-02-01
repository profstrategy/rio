import { Crown } from "lucide-react";
import { getLeaderboard } from "../../actions/leaderboard";
import { getDashboardData } from "../../actions/user";
import TierBadge from "@/components/ui/tier-badge";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();
  const currentUser = await getDashboardData();

  // STYLES
  const styles = {
    glassPanel: "bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-[30px]",
    th: "p-6 text-gray-500 text-[10px] font-bold font-sync uppercase tracking-[0.2em]",
    td: "p-6 border-b border-white/5 font-space",
  };

  return (
    <div className="space-y-8 pb-10 relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00D2FF]/10 blur-[120px] pointer-events-none -z-10" />

      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold font-sync text-white mb-2 uppercase tracking-wide">
            Realm of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#3AFFAD]">Dreamers</span>
        </h1>
        <p className="text-gray-400 font-space text-sm">The elite believers shaping the protocol.</p>
      </div>

      {/* THE LUXURY TABLE CONTAINER */}
      <div className={`${styles.glassPanel} overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] relative`}>
        
        {/* Glow effect behind top rows */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#00D2FF]/5 to-transparent pointer-events-none" />

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#020617]/50">
                <th className={`${styles.th} pl-8`}>Rank</th>
                <th className={styles.th}>Dreamer</th>
                <th className={`${styles.th} text-center`}>Tier</th>
                <th className={`${styles.th} text-right pr-8`}>Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboard.map((user, index) => {
                const rank = index + 1;
                const isMe = user.id === currentUser?.id;
                
                // Special styling for Top 3
                let rankStyle = "text-gray-500 font-mono font-bold";
                let rowBg = "hover:bg-white/[0.02] transition-colors";
                
                if (rank === 1) { 
                    rankStyle = "text-[#FFD700] font-bold text-xl drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"; 
                    rowBg = "bg-gradient-to-r from-[#FFD700]/10 to-transparent border-l-2 border-[#FFD700]"; 
                }
                else if (rank === 2) { 
                    rankStyle = "text-[#C0C0C0] font-bold text-lg drop-shadow-[0_0_10px_rgba(192,192,192,0.4)]"; 
                    rowBg = "bg-gradient-to-r from-[#C0C0C0]/10 to-transparent border-l-2 border-[#C0C0C0]"; 
                }
                else if (rank === 3) { 
                    rankStyle = "text-[#CD7F32] font-bold text-lg drop-shadow-[0_0_10px_rgba(205,127,50,0.4)]"; 
                    rowBg = "bg-gradient-to-r from-[#CD7F32]/10 to-transparent border-l-2 border-[#CD7F32]"; 
                }
                
                if (isMe) { 
                    rowBg = "bg-[#00D2FF]/10 border-l-2 border-[#00D2FF] shadow-[inset_0_0_30px_rgba(0,210,255,0.1)]"; 
                }

                return (
                  <tr key={user.id} className={rowBg}>
                    
                    {/* RANK */}
                    <td className={`${styles.td} pl-8`}>
                      <div className="flex items-center gap-4">
                        <span className={rankStyle}>#{rank}</span>
                        {rank === 1 && <Crown className="text-[#FFD700] w-6 h-6 animate-pulse" fill="currentColor" />}
                      </div>
                    </td>

                    {/* USER */}
                    <td className={styles.td}>
                      <div className="flex items-center gap-4">
                        <div className={`relative w-10 h-10 rounded-full p-[1px] ${rank <= 3 ? 'bg-gradient-to-br from-white/80 to-transparent' : 'border border-white/10'}`}>
                           <img 
                             src={user.avatarUrl || "/default-avatar.png"} 
                             alt={user.username || "User"} 
                             className="w-full h-full rounded-full object-cover bg-[#020617]"
                           />
                           {rank === 1 && <div className="absolute -top-3 -right-2 text-xl">👑</div>}
                        </div>
                        <div>
                          <p className={`font-bold text-sm md:text-base ${isMe ? "text-[#00D2FF] drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]" : "text-white"}`}>
                            {user.username} {isMe && "(You)"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* TIER BADGE */}
                    <td className={`${styles.td} text-center`}>
                        <TierBadge tier={user.currentLevel} />
                    </td>

                    {/* POINTS */}
                    <td className={`${styles.td} pr-8 text-right`}>
                      <span className={`font-mono font-bold text-lg ${rank <= 3 ? 'text-white' : 'text-gray-400'}`}>
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
            <div className="p-16 text-center text-gray-500 font-sync text-xs uppercase tracking-widest">
                The realm is quiet...
            </div>
        )}
      </div>
    </div>
  );
}