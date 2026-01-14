import {useState} from 'react'

const Hero = () => {
      const [idoModalOpen, setIdoModalOpen] = useState(false);
  return (
    <>
              <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">The Bird That Flew Over The Dogs</span>
            </div>
            <h1 className="font-sync text-4xl md:text-6xl font-bold leading-none mb-8 tracking-tighter">
              THE BIRD THAT FLEW<br />
              <span className="text-gradient">OVER THE DOGS</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-md mb-10 leading-relaxed italic">
              "Like Blu escaping captivity, $RIO breaks free from traditional dog-coin constraints to soar in the DeFi skies."
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIdoModalOpen(true)} 
                className="px-10 py-5 bg-blue-600 rounded-2xl font-bold shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all text-white"
              >
                JOIN IDO
              </button>
              <a href="/whitepaper" className="px-10 py-5 glass-premium rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                <span>WHITEPAPER</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="relative flex justify-center" data-aos="zoom-in" data-aos-delay="200">
            <img src="/rio5.png" className="w-full max-w-lg animate-float drop-shadow-[0_0_50px_rgba(0,210,255,0.4)] rounded-2xl" alt="Rio Character" />
          </div>
        </div>
      </section>


       {/* --- MODAL --- */}
      {idoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIdoModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative glass-premium p-8 md:p-12 rounded-[40px] max-w-md w-full text-center border border-blue-500/30 shadow-[0_0_100px_rgba(0,210,255,0.2)] animate-float">
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
            <button 
              onClick={() => setIdoModalOpen(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-400 rounded-xl font-bold text-black uppercase tracking-widest hover:scale-105 transition-transform btn-glow"
            >
              Roger That
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero