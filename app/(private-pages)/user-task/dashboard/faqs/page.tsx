import Accordion from "@/components/ui/Accordion";
import { MessageCircle, Mail } from "lucide-react";

const faqs = [
  {
    question: "How do Dream Points work?",
    answer: "Dream Points (梦点) are earned by completing daily quests, social tasks, and inviting friends. They determine your Rank on the global leaderboard. In the future, these points will be the key to unlocking the $DREAM token airdrop."
  },
  {
    question: "How is my X (Twitter) connection used?",
    answer: "We use a read-only connection to verify your username and avatar. We also check if you have liked or retweeted specific posts to verify quest completion. We will never post on your behalf without your permission."
  },
  {
    question: "How does the Daily Streak work?",
    answer: "Log in every 24 hours to keep your streak alive. Higher streaks grant a permanent multiplier to all points earned. If you miss a day, your streak multiplier resets to 1x."
  },
  {
    question: "Can I lose my points or rank?",
    answer: "Points are permanent and cannot be lost. However, your Rank is dynamic—if other dreamers earn points faster than you, they may overtake your position on the leaderboard. Consistency is key."
  },
  {
    question: "When is the Airdrop / Token Launch?",
    answer: "The 'Awakening' phase is coming soon. Top-tier users (Diamond & Master) will receive priority allocation. Stay tuned to our official X account for the snapshot date."
  }
];

export default function FAQPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2 text-glow">Help Center</h1>
          <p className="text-gray-400">Everything you need to know about the Dream ecosystem.</p>
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
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h3 className="text-lg font-bold text-white mb-4">Still need help?</h3>
                <p className="text-sm text-gray-400 mb-6">
                    If you can't find the answer you're looking for, our team is ready to assist you.
                </p>

                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group">
                        <MessageCircle size={18} className="text-neon-cyan group-hover:text-white transition-colors" />
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white">Join Telegram</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group">
                        <Mail size={18} className="text-neon-cyan group-hover:text-white transition-colors" />
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white">Email Support</span>
                    </button>
                </div>
            </div>

            {/* Info Box */}
            <div className="p-6 border border-dashed border-white/10 rounded-2xl text-center">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Current Version</p>
                <p className="text-white font-mono">v1.0.4 (Sapphire)</p>
            </div>

        </div>

      </div>
    </div>
  );
}