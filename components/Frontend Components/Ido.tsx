import { useState, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Rocket, Zap, Globe, ShieldCheck } from 'lucide-react'; // Added icons for visual appeal

const Ido = () => {
  const [idoModalOpen, setIdoModalOpen] = useState(false);
  
  // Removed countdown state logic since IDO is started

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <section id="ido" className="py-32 px-6 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto glass-premium rounded-[40px] p-8 md:p-12 border-t border-white/10 relative z-10" data-aos="fade-up">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* --- LEFT COLUMN: LIVE STATUS --- */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-sync text-3xl md:text-5xl font-bold text-white">$RIO IDO LAUNCH</h2>
                <div className="hidden md:flex px-3 py-1 rounded-full bg-green-500/20 border border-green-500 items-center gap-2 animate-pulse">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Live</span>
                </div>
              </div>

              {/* REPLACED COUNTDOWN WITH LIVE STATUS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {/* Status Card 1 */}
                  <div className="glass-premium p-6 rounded-3xl border border-green-500/30 bg-green-500/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                          <Rocket className="w-12 h-12 text-green-400" />
                      </div>
                      <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">Current Status</p>
                      <h3 className="text-2xl font-bold text-white mb-2">Public Sale Active</h3>
                      <p className="text-sm text-gray-400">The portal is open. Allocation is FCFS.</p>
                  </div>

                  {/* Status Card 2 */}
                  <div className="glass-premium p-6 rounded-3xl border border-blue-500/30 bg-blue-500/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                          <Zap className="w-12 h-12 text-blue-400" />
                      </div>
                      <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Network</p>
                      <h3 className="text-2xl font-bold text-white mb-2">Solana Chain</h3>
                      <p className="text-sm text-gray-400">Fast transactions, minimal gas fees.</p>
                  </div>
              </div>

              <p className="text-gray-400 leading-relaxed max-w-xl">
                 The $RIO token launch is officially live. Join the movement that merges culture, community, and technology on the Solana blockchain. Secure your allocation before the round closes.
              </p>
            </div>

            {/* --- RIGHT COLUMN: DETAILS & ACTION --- */}
            <div className="flex flex-col justify-center h-full">
              <div className="glass-premium p-8 rounded-[30px] border border-white/5 bg-black/20">
                  <div className="space-y-6 text-sm font-bold uppercase tracking-wider mb-8">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-gray-400 flex items-center gap-2"><Globe className="w-4 h-4" /> Min Allocation</span> 
                        <span className="text-blue-400 text-lg">$38</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-gray-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Max Allocation</span> 
                        <span className="text-blue-400 text-lg">$500</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                        <span className="text-gray-400">Token Price</span> 
                        <span className="text-green-400 text-xl font-sync">$0.001</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIdoModalOpen(true)}
                    className="w-full py-5 rounded-xl font-bold text-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(74,222,128,0.3)] bg-gradient-to-r from-green-500 to-emerald-400 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(74,222,128,0.6)]"
                  >
                    Buy Tokens Now
                  </button>
                  
                  <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
                      Powered by Solana
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- IDO MODAL (Simplified for Live State) --- */}
      {idoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIdoModalOpen(false)}
          ></div>

          {/* Modal Container */}
          <div className="relative glass-premium p-8 md:p-12 rounded-[40px] max-w-md w-full text-center border border-green-500/30 shadow-[0_0_100px_rgba(74,222,128,0.15)] animate-float">
            
             <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-400 text-green-400 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                <Rocket className="w-10 h-10" />
             </div>

             <h3 className="font-sync text-3xl font-bold mb-3 uppercase text-white">Access Portal</h3>
             <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500 mb-6">
                <p className="text-green-400 text-[10px] font-bold uppercase tracking-[0.2em]">Sale is Live</p>
             </div>
             
             <p className="text-gray-400 leading-relaxed mb-8 text-sm">
               You are about to be redirected to the official RIO IDO platform. Ensure your wallet is ready for connection.
             </p>
             
             <a 
               href="https://ido.rioonbonk.io" 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full"
             >
               <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl font-bold text-black uppercase tracking-widest hover:scale-[1.02] transition-transform btn-glow shadow-[0_0_30px_rgba(74,222,128,0.4)]">
                 Proceed to Sale
               </button>
             </a>

             <button 
                onClick={() => setIdoModalOpen(false)}
                className="mt-4 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
             >
                Cancel
             </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Ido