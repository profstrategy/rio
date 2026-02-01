import Accordion from "@/components/ui/accordion";
import { MessageCircle, Mail, HelpCircle, Code } from "lucide-react";

const faqs = [
  {
    question: "How does the RIO Ecosystem work?",
    answer: "The RIO protocol rewards users for active participation. By completing daily missions, engaging with the community, and expanding the network, you earn Dream Points (PTS). These points determine your clearance level and future allocation of the $RIO token."
  },
  {
    question: "Is my Social Connection secure?",
    answer: "Absolutely. We utilize a secure, read-only API connection to verify your identity and track mission completion (like retweets or likes). The protocol cannot post on your behalf or access your private messages."
  },
  {
    question: "How does the Streak Multiplier apply?",
    answer: "Consistency is rewarded. Maintain a 24-hour login cycle to increase your Streak. Higher streaks apply a multiplier to your earned points. Missing a cycle causes a system reset to 1x."
  },
  {
    question: "Can I lose my Rank?",
    answer: "Your accumulated points are permanent recorded on our ledger. However, the Leaderboard is competitive. If other agents outperform your daily output, they may overtake your position. Stay active to hold your Rank."
  },
  {
    question: "When is the Token Generation Event (TGE)?",
    answer: "The 'Awakening' phase is imminent. Top-tier agents (Level 3 & above) will receive priority whitelist access. Monitor the official communication channels for the snapshot block height announcement."
  }
];

export default function FAQPage() {
  
  // STYLES
  const styles = {
    glassPanel: "bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-[24px]",
    neonTextBlue: "text-[#00D2FF] drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]",
  };

  return (
    <div className="space-y-8 pb-10 font-space">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold font-sync text-white mb-2 uppercase tracking-wide">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#3AFFAD]">Intel</span>
          </h1>
          <p className="text-gray-400 text-sm">Decrypted protocols and operational guidelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: FAQ List */}
        <div className="lg:col-span-2 space-y-4">
          {faqs.map((faq, index) => (
            <Accordion key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Right Column: Support Cards */}
        <div className="space-y-6">
            
            {/* Quick Support Box */}
            <div className={`${styles.glassPanel} p-6 relative overflow-hidden group`}>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#00D2FF]/10 rounded-lg text-[#00D2FF]">
                        <HelpCircle size={20} />
                    </div>
                    <h3 className="text-lg font-bold font-sync text-white uppercase tracking-wide">Support Uplink</h3>
                </div>
                
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    If the database query yields no results, establish a direct line with our command team.
                </p>

                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/5 hover:bg-[#00D2FF]/10 border border-white/5 hover:border-[#00D2FF]/30 rounded-xl transition-all group duration-300">
                        <MessageCircle size={18} className="text-gray-400 group-hover:text-[#00D2FF] transition-colors" />
                        <span className="text-xs font-bold font-sync uppercase tracking-wider text-gray-300 group-hover:text-white">Join Telegram</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/5 hover:bg-[#3AFFAD]/10 border border-white/5 hover:border-[#3AFFAD]/30 rounded-xl transition-all group duration-300">
                        <Mail size={18} className="text-gray-400 group-hover:text-[#3AFFAD] transition-colors" />
                        <span className="text-xs font-bold font-sync uppercase tracking-wider text-gray-300 group-hover:text-white">Email Support</span>
                    </button>
                </div>
            </div>

            {/* Info Box */}
            <div className="p-6 border-2 border-dashed border-white/5 rounded-[24px] text-center bg-[#020617]/30 hover:border-white/10 transition-colors">
                <p className="text-[10px] text-gray-500 font-sync uppercase tracking-widest font-bold mb-2 flex items-center justify-center gap-2">
                    <Code size={12} /> System Version
                </p>
                <p className="text-[#00D2FF] font-mono text-sm">v1.0.4 (RIO_GENESIS)</p>
            </div>

        </div>

      </div>
    </div>
  );
}