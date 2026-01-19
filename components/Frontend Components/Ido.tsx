import { useState, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Ido = () => {
  const [idoModalOpen, setIdoModalOpen] = useState(false);
  const [isLive, setIsLive] = useState(false); 
  const [countdown, setCountdown] = useState({
    DAYS: '00',
    HOURS: '00',
    MINS: '00',
    SECS: '00'
  });

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1200, once: true });

    // Initialize Countdown
    const target = new Date("Jan 20, 2026 12:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const d = target - now;

      if (d <= 0) {
        // Time is up!
        setIsLive(true);
        setCountdown({ DAYS: '00', HOURS: '00', MINS: '00', SECS: '00' });
        clearInterval(interval);
      } else {
        // Keep counting down
        setCountdown({
          DAYS: String(Math.floor(d / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          HOURS: String(Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
          MINS: String(Math.floor((d % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
          SECS: String(Math.floor((d % (1000 * 60)) / 1000)).padStart(2, '0')
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <section id="ido" className="py-32 px-6">
        <div className="max-w-6xl mx-auto glass-premium rounded-[40px] p-12 border-t border-white/10" data-aos="fade-up">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-sync text-4xl mb-6">$RIO ON BONK IDO LAUNCH</h2>
              
              {isLive ? (
                <div className="inline-block px-4 py-2 mb-12 rounded-full bg-green-500/20 border border-green-500 animate-pulse">
                   <p className="text-green-400 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      IDO Officially Started
                   </p>
                </div>
              ) : (
                <p className="text-gray-400 mb-12 uppercase tracking-widest text-sm font-bold">
                  Begins — 20 Jan 2026
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(countdown).map(([label, val]) => (
                  <div key={label} className="glass-premium p-6 rounded-3xl text-center border-b-2 border-blue-500">
                    <span className="block text-4xl font-bold mb-1">{val}</span>
                    <span className="text-[9px] uppercase tracking-widest text-blue-500 font-bold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="space-y-4 text-sm font-bold uppercase tracking-tighter">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Min Participation</span> <span className="text-blue-400">$38</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Max Participation</span> <span className="text-blue-400">$500</span></div>
                <div className="flex justify-between"><span>Token Price</span> <span className="text-green-400">$0.001</span></div>
              </div>
              
              <button
                onClick={() => setIdoModalOpen(true)}
                
                className={`w-full py-5 rounded-2xl font-bold mt-10 transition-all shadow-xl ${
                    isLive 
                    ? "bg-green-500 text-black hover:bg-green-400 hover:scale-105" 
                    : "bg-white text-black hover:bg-blue-400 hover:text-white"
                }`}
              >
                {isLive ? "BUY TOKENS NOW" : "PARTICIPATE NOW"}
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* --- MODAL --- */}
      {idoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIdoModalOpen(false)}
          ></div>

          <div className="relative glass-premium p-8 md:p-12 rounded-[40px] max-w-md w-full text-center border border-blue-500/30 shadow-[0_0_100px_rgba(0,210,255,0.2)] animate-float">
            
            {/* Conditional Modal Content */}
            {isLive ? (
                 <>
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400 text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                    <h3 className="font-sync text-2xl md:text-3xl font-bold mb-2 uppercase">Sale is Live!</h3>
                    <p className="text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Phase 1 Active</p>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        The IDO is officially open. Please connect your Solana wallet to proceed with the transaction.
                    </p>
                 </>
            ) : (
                <>
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400 text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        </svg>
                    </div>
                    <h3 className="font-sync text-2xl md:text-3xl font-bold mb-2 uppercase">Systems Cooling</h3>
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Launchpad Initiating...</p>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        The portal is currently fueling up. Wallet connections will go live immediately upon <strong>IDO Launch (Jan 20)</strong>.
                    </p>
                </>
            )}

            <button
              onClick={() => setIdoModalOpen(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-400 rounded-xl font-bold text-black uppercase tracking-widest hover:scale-105 transition-transform btn-glow"
            >
              {isLive ? "Connect Wallet" : "Roger That"}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Ido