import React from 'react'

const Participation = () => {
  return (
    <>
        <section id="how-to-participate" className="py-32 px-6 bg-slate-950/40">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="font-sync text-4xl mb-4 uppercase tracking-widest">How to Participate</h2>
          <p className="text-gray-500 uppercase text-xs tracking-[0.3em]">Three simple steps to join the flock</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="glass-premium p-10 rounded-[40px] text-center group hover:border-blue-500/50 transition-all" data-aos="fade-up">
            <span className="step-number text-6xl font-bold block mb-6">1</span>
            <h3 className="font-sync text-lg mb-4 uppercase">Connect Wallet</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Securely link your Solana wallet to the $RIO portal to begin your journey.</p>
          </div>
          <div className="glass-premium p-10 rounded-[40px] text-center group hover:border-green-500/50 transition-all" data-aos="fade-up" data-aos-delay="100">
            <span className="step-number text-6xl font-bold block mb-6">2</span>
            <h3 className="font-sync text-lg mb-4 uppercase">Select Amount</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Choose your investment tier ($38 - $500) to acquire your $RIO tokens.</p>
          </div>
          <div className="glass-premium p-10 rounded-[40px] text-center group hover:border-blue-500/50 transition-all" data-aos="fade-up" data-aos-delay="200">
            <span className="step-number text-6xl font-bold block mb-6">3</span>
            <h3 className="font-sync text-lg mb-4 uppercase">Purchase Tokens</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Confirm the transaction and watch your $RIO tokens take flight in your wallet.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Participation