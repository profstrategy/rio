import { Users, Zap, UserPlus, Share2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getDashboardData } from "../../actions/user";
import CopyButton from "@/components/ui/copy-button";

export default async function ReferralPage() {
  const user = await getDashboardData();
  if (!user) redirect("/");
  
  // 1. GENERATE LINK
  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.rio-coming-soon.vercel.app'}/?ref=${user.id}`;

  // 2. FETCH REFERRED USERS
  const referrals = await prisma.referral.findMany({
    where: { referrerId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  const referredUserIds = referrals.map(r => r.referredId);
  
  const referredUsers = await prisma.user.findMany({
    where: {
      id: { in: referredUserIds }
    },
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      createdAt: true,
      dreamPoints: true
    }
  });

  // Calculate Stats
  const totalReferrals = referredUsers.length;
  const earnedPoints = totalReferrals * 100;

  // --- STYLES ---
  const styles = {
    glassPanel: "bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-[30px]",
    neonTextBlue: "text-[#00D2FF] drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]",
    neonTextGreen: "text-[#3AFFAD] drop-shadow-[0_0_5px_rgba(58,255,173,0.5)]",
  };

  return (
    <div className="space-y-8 pb-10 relative">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D2FF]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div>
        <h1 className="text-4xl font-extrabold font-sync text-white mb-2 uppercase tracking-wide">
            Invite <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#3AFFAD]">Dreamers</span>
        </h1>
        <p className="text-gray-400 font-space text-sm">Expand the network and earn protocol rewards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: The Link Card */}
        <div className={`${styles.glassPanel} p-8 space-y-6 relative overflow-hidden group`}>
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2FF]/10 blur-[60px] rounded-full group-hover:bg-[#00D2FF]/20 transition-all duration-500" />
          
          <div className="w-16 h-16 rounded-2xl bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF] mb-4 border border-[#00D2FF]/30 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
            <Share2 size={32} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold font-sync text-white uppercase tracking-wide">Your Unique Link</h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed font-space">
              Share this access node. For every user that initializes via your link, you receive <span className="text-[#00D2FF] font-bold">+100 PTS</span> instantly.
            </p>
          </div>

          <div className="p-1.5 pl-4 bg-[#020617] rounded-xl border border-white/10 flex items-center justify-between gap-4 shadow-inner group-hover:border-[#00D2FF]/30 transition-colors">
            <code className="text-xs text-[#00D2FF] truncate font-mono bg-transparent w-full tracking-tight">
              {referralLink}
            </code>
            {/* Ensure CopyButton is styled or wrapped if needed. Assuming it renders a button. */}
            <div className="shrink-0">
                <CopyButton text={referralLink} />
            </div>
          </div>
        </div>

        {/* RIGHT: Stats Card */}
        <div className={`${styles.glassPanel} p-8 flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden`}>
           <div className="absolute inset-0 bg-gradient-to-br from-[#00D2FF]/5 to-transparent pointer-events-none" />
           
           <div className="relative z-10 w-full grid grid-cols-2 gap-4">
             {/* Total Invites Stat */}
             <div className="p-6 rounded-[24px] bg-[#020617]/50 border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-gray-500 font-bold font-sync uppercase tracking-widest text-[10px] mb-2">Total Invites</h3>
                <p className="text-4xl font-bold font-space text-white">{totalReferrals}</p>
             </div>

             {/* Points Earned Stat */}
             <div className="p-6 rounded-[24px] bg-[#020617]/50 border border-white/5 hover:border-[#3AFFAD]/30 transition-colors group/stat">
                <h3 className="text-gray-500 font-bold font-sync uppercase tracking-widest text-[10px] mb-2">Points Earned</h3>
                <div className="flex items-center justify-center gap-2 text-[#3AFFAD]">
                    <Zap size={24} fill="currentColor" className="group-hover/stat:scale-110 transition-transform" />
                    <span className={`text-4xl font-bold font-space ${styles.neonTextGreen}`}>{earnedPoints.toLocaleString()}</span>
                </div>
             </div>
           </div>
        </div>

      </div>

      {/* REFERRED USERS TABLE */}
      <div className={`${styles.glassPanel} overflow-hidden border border-white/5`}>
        <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-[#020617]/30">
            <div className="p-2 rounded-lg bg-[#3AFFAD]/10 text-[#3AFFAD]">
                <UserPlus size={18} />
            </div>
            <h3 className="text-lg font-bold font-sync text-white uppercase tracking-wide">Referral History</h3>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#020617]/50 text-[#00D2FF] text-[10px] font-bold font-sync uppercase tracking-[0.2em]">
                        <th className="p-5 pl-8">Dreamer</th>
                        <th className="p-5">Joined Protocol</th>
                        <th className="p-5 text-right pr-8">Reward Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {referredUsers.map((friend) => (
                        <tr key={friend.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="p-5 pl-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img 
                                            src={friend.avatarUrl || "/default-avatar.png"} 
                                            alt={friend.username || "User"} 
                                            className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-[#00D2FF]/50 transition-colors bg-[#020617] object-cover"
                                        />
                                    </div>
                                    <span className="font-bold font-space text-white text-sm group-hover:text-[#00D2FF] transition-colors">
                                        {friend.username || "Anonymous User"}
                                    </span>
                                </div>
                            </td>
                            <td className="p-5 text-xs text-gray-500 font-mono">
                                {new Date(friend.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-5 text-right pr-8">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#3AFFAD]/10 border border-[#3AFFAD]/20 text-[#3AFFAD] text-[10px] font-bold font-sync uppercase tracking-wider shadow-[0_0_10px_rgba(58,255,173,0.1)]">
                                    +100 PTS
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {referredUsers.length === 0 && (
            <div className="p-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-600">
                    <Users size={32} opacity={0.5} />
                </div>
                <p className="text-gray-500 text-sm font-space">No referrals linked to your ID.</p>
                <span className="text-[10px] text-gray-600 font-mono mt-2 bg-white/5 px-2 py-1 rounded">ID: {user.id}</span>
            </div>
        )}
      </div>
    </div>
  );
}