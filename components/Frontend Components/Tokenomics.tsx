import React from 'react'

const Tokenomics = () => {
  return (
    <>
        <section id="tokenomics" className="py-32 px-6 bg-blue-900/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sync text-5xl mb-20">TOKENOMICS</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-premium rounded-[40px] p-12 border-l-4 border-blue-500" data-aos="fade-right">
              <div className="flex items-center gap-6 mb-8">
                <div className="text-6xl font-bold text-blue-400">50%</div>
                <h3 className="font-sync text-2xl uppercase">Liquidity Pool</h3>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">Locked to protect price and ensure a stable flight across the Solana jungle. Your safety is the Flock's priority.</p>
            </div>
            <div className="glass-premium rounded-[40px] p-10 border-t-4 border-green-400" data-aos="fade-left">
              <div className="text-4xl font-bold text-green-400 mb-4">16%</div>
              <h3 className="font-sync text-lg mb-6 uppercase tracking-widest">Ecosystem & Rewards</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Airdrops / Staking / Yapping</p>
            </div>
            <div className="glass-premium rounded-[40px] p-10" data-aos="fade-up">
              <div className="text-3xl font-bold mb-2">13%</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Presale Allocation</h3>
            </div>
            <div className="glass-premium rounded-[40px] p-10" data-aos="fade-up" data-aos-delay="100">
              <div className="text-3xl font-bold mb-2">10%</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Team & Advisors (Locked)</h3>
            </div>
            <div className="glass-premium rounded-[40px] p-10" data-aos="fade-up" data-aos-delay="200">
              <div className="text-3xl font-bold mb-2">11%</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Marketing & Partners</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tokenomics