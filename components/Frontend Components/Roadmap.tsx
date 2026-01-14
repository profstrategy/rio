import React from 'react'

const Roadmap = () => {
  return (
    <>
        <section id="roadmap" className="py-32 px-6 relative">
        <div className="roadmap-vine"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-sync text-center text-5xl mb-32 uppercase tracking-[0.5em]">The Flight Path</h2>
          
          <div className="space-y-40">
            <div className="flex flex-col md:flex-row items-center gap-12" data-aos="fade-left">
              <div className="w-full md:w-1/2 glass-premium p-10 rounded-[40px] border-l-4 border-blue-400">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Phase 1 (Month 1-2)</span>
                <h3 className="font-sync text-xl mt-4 mb-6 uppercase">Foundation & Seeding</h3>
                <ul className="text-xs text-gray-400 space-y-3 font-bold uppercase tracking-widest leading-loose">
                  <li>• Brand Identity + Mission Statement</li>
                  <li>• Social Channels (TG, X, Discord)</li>
                  <li>• Community Onboarding Campaign</li>
                  <li>• Release Lite Paper (Vision & Utility)</li>
                  <li>• Website V1 Launch</li>
                </ul>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-blue-500 rounded-full items-center justify-center font-bold shadow-[0_0_20px_#3b82f6]">1</div>
              <div className="md:w-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-12" data-aos="fade-right">
              <div className="w-full md:w-1/2 glass-premium p-10 rounded-[40px] border-r-4 border-green-400">
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Phase 2 (Month 2+)</span>
                <h3 className="font-sync text-xl mt-4 mb-6 uppercase">The Yapping Era</h3>
                <ul className="text-xs text-gray-400 space-y-3 font-bold uppercase tracking-widest leading-loose text-right">
                  <li>• Commencement of SOCIAL-FI META</li>
                  <li>• Public Sale (Presale / IDO)</li>
                  <li>• TGE and DEX Listing</li>
                  <li>• SocialFi Reward Distribution</li>
                  <li>• Liquidity Pool Activation</li>
                </ul>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-green-400 rounded-full items-center justify-center font-bold shadow-[0_0_20px_#22c55e]">2</div>
              <div className="md:w-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12" data-aos="fade-left">
              <div className="w-full md:w-1/2 glass-premium p-10 rounded-[40px] border-l-4 border-blue-400">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Phase 3</span>
                <h3 className="font-sync text-xl mt-4 mb-6 uppercase">The Flight</h3>
                <ul className="text-xs text-gray-400 space-y-3 font-bold uppercase tracking-widest leading-loose">
                  <li>• Community-led CEX Campaigns</li>
                  <li>• $RIO InfoFi Model Expansion</li>
                  <li>• "Bonk Jungle" Partnerships</li>
                  <li>• Ecosystem Integrations</li>
                </ul>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-blue-500 rounded-full items-center justify-center font-bold shadow-[0_0_20px_#3b82f6]">3</div>
              <div className="md:w-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-12" data-aos="fade-right">
              <div className="w-full md:w-1/2 glass-premium p-10 rounded-[40px] border-r-4 border-green-400">
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Phase 4</span>
                <h3 className="font-sync text-xl mt-4 mb-6 uppercase">The Carnival</h3>
                <ul className="text-xs text-gray-400 space-y-3 font-bold uppercase tracking-widest leading-loose text-right">
                  <li>• Bird-themed Burn/Rebirth Mechanics</li>
                  <li>• NFT Collection & Collaborations</li>
                  <li>• Cultural & Creative Expansion</li>
                  <li>• Global Carnival Presence</li>
                </ul>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-green-400 rounded-full items-center justify-center font-bold shadow-[0_0_20px_#22c55e]">4</div>
              <div className="md:w-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Roadmap