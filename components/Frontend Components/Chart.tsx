import React from 'react'

const Chart = () => {
  return (
    <>
        <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sync text-center text-4xl mb-16 uppercase tracking-widest">Jungle Metrics</h2>
          <div className="glass-premium rounded-[40px] h-[600px] overflow-hidden p-2">
            <iframe 
              src="https://www.dextools.io/widget-chart/en/solana/pe-light/0x?theme=dark&chartType=1" 
              width="100%" 
              height="100%" 
              className="rounded-[38px] opacity-80 hover:opacity-100 transition-opacity duration-700 border-none"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default Chart