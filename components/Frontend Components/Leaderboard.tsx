import React from 'react'

const Leaderboard = () => {
  return (
    <>
        <section id="leaderboard" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-5xl mx-auto text-center">
          <div data-aos="fade-down">
            <h2 className="font-sync text-4xl md:text-5xl mb-6 uppercase tracking-widest">
              Jungle <span className="text-gradient">Leaderboard</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-16 text-sm leading-relaxed">
              Compete for dominance in the flock. Top holders and active community members will earn exclusive $RIO rewards, NFTs, and the title of "Alpha Bird."
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto" data-aos="zoom-in">
            
            <div className="glass-premium rounded-[40px] p-8 opacity-50 blur-sm pointer-events-none select-none grayscale-[50%]">
              <div className="flex items-center justify-between p-4 mb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-400"></div>
                  <div className="h-4 w-32 bg-white/20 rounded-full"></div>
                </div>
                <div className="h-4 w-16 bg-green-400/20 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-4 mb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                  <div className="h-4 w-24 bg-white/20 rounded-full"></div>
                </div>
                <div className="h-4 w-16 bg-green-400/20 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-4 mb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-400"></div>
                  <div className="h-4 w-28 bg-white/20 rounded-full"></div>
                </div>
                <div className="h-4 w-16 bg-green-400/20 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-400"></div>
                  <div className="h-4 w-32 bg-white/20 rounded-full"></div>
                </div>
                <div className="h-4 w-16 bg-green-400/20 rounded-full"></div>
              </div>
            </div>

           
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
              <div className="glass-premium p-8 rounded-3xl border border-blue-400/30 shadow-[0_0_50px_rgba(0,210,255,0.2)] animate-float">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="font-sync text-2xl font-bold uppercase mb-2">System Locked</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Unlocks at Phase 3</p>
                <button className="mt-6 px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-blue-400 hover:text-white transition-all btn-glow uppercase tracking-wider">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Leaderboard