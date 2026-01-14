import React from 'react'

const Gallery = () => {
  return (
    <>
              <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sync text-center text-3xl mb-16 uppercase tracking-[0.5em]">The Fearless Flock</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flock-card relative h-80 rounded-[32px] overflow-hidden glass-premium group" data-aos="fade-up">
              <img src="/rio7.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Rio 1" />
              <div className="absolute bottom-6 left-6 font-bold text-xs uppercase tracking-widest">$RIO Alpha</div>
            </div>
            <div className="flock-card relative h-80 rounded-[32px] overflow-hidden glass-premium group" data-aos="fade-up" data-aos-delay="100">
              <img src="/rio8.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Rio 2" />
            </div>
            <div className="flock-card relative h-80 rounded-[32px] overflow-hidden glass-premium group" data-aos="fade-up" data-aos-delay="200">
              <img src="/rio2.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Rio 3" />
            </div>
            <div className="flock-card relative h-80 rounded-[32px] overflow-hidden glass-premium group" data-aos="fade-up" data-aos-delay="300">
              <img src="/rio4.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Rio 4" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Gallery