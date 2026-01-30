import { Users, Zap, UserPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getDashboardData } from "../../actions/user";
import CopyButton from "@/components/ui/copy-button";

export default async function ReferralPage() {
  const user = await getDashboardData();
  if (!user) redirect("/");
  
  // 1. GENERATE LINK
  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.dreamcoinbnb.com'}/?ref=${user.id}`;

  // 2. FETCH REFERRED USERS (Explicit Query)
  // We strictly look for referrals where YOU are the referrer
  const referrals = await prisma.referral.findMany({
    where: { referrerId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
        // We include the user details of the person you referred
        // Note: The relation name in schema.prisma must match here. 
        // If this fails, we will fetch users manually in the next step.
    }
  });

  // Manual fetch to ensure we get the user details even if relations are tricky
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

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-4xl font-extrabold text-white mb-2 text-glow">Invite Dreamers</h1>
        <p className="text-gray-400">Grow the community and earn massive rewards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: The Link Card */}
        <div className="glass-panel p-8 space-y-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-neon-blue/10 blur-[50px] rounded-full group-hover:bg-neon-blue/20 transition-all" />
          
          <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan mb-4 border border-neon-cyan/20">
            <Users size={32} />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white">Your Unique Link</h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Share this link. When someone joins using it, you earn <span className="text-neon-cyan font-bold">+100 Points</span> instantly.
            </p>
          </div>

          <div className="p-4 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between gap-4">
            <code className="text-sm text-neon-blue truncate font-mono bg-transparent w-full">
              {referralLink}
            </code>
            <CopyButton text={referralLink} />
          </div>
        </div>

        {/* RIGHT: Stats Card */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent" />
           
           <div className="relative z-10 w-full grid grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total Invites</h3>
                <p className="text-4xl font-bold text-white mt-2">{totalReferrals}</p>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Points Earned</h3>
                <div className="flex items-center justify-center gap-1 mt-2 text-neon-cyan">
                    <Zap size={24} fill="currentColor" />
                    <span className="text-4xl font-bold">{earnedPoints.toLocaleString()}</span>
                </div>
             </div>
           </div>
        </div>

      </div>

      {/* REFERRED USERS TABLE */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
        <div className="p-6 border-b border-white/5 flex items-center gap-2">
            <UserPlus size={18} className="text-green-400" />
            <h3 className="text-lg font-bold text-white">Referral History</h3>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-black/20 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        <th className="p-5 pl-8">Dreamer</th>
                        <th className="p-5">Joined</th>
                        <th className="p-5 text-right pr-8">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {referredUsers.map((friend) => (
                        <tr key={friend.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-5 pl-8">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={friend.avatarUrl || "/default-avatar.png"} 
                                        alt={friend.username || "User"} 
                                        className="w-8 h-8 rounded-full border border-white/10 bg-black"
                                    />
                                    <span className="font-bold text-white text-sm">{friend.username}</span>
                                </div>
                            </td>
                            <td className="p-5 text-xs text-gray-400 font-mono">
                                {new Date(friend.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-5 text-right pr-8">
                                <span className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase">
                                    +100 PTS
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {referredUsers.length === 0 && (
            <div className="p-12 text-center text-gray-500 text-sm">
                No referrals found for this account ID.
                <br/>
                <span className="text-xs opacity-50 font-mono mt-2 block">ID: {user.id}</span>
            </div>
        )}
      </div>
    </div>
  );
}