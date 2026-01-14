import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="py-32 px-6 glass-premium mt-20 text-center border-t-2 border-blue-500/20">
        <h2 className="font-sync text-4xl mb-4">$RIO ON BONK</h2>
        <p className="text-xs text-gray-500 uppercase tracking-[0.5em] mb-12">The block chain comes alive.</p>
        <div className="flex justify-center gap-10 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          <a href="https://x.com/rioonbonk1" className="hover:text-blue-400">Twitter (X)</a>
          <a href="https://t.me/rioonbonk" className="hover:text-blue-400">Telegram</a>
          <a href="RIO ON BONK WHITEPAPER 2.pdf" className="hover:text-blue-400">Whitepaper</a>
        </div>
        <p className="mt-16 text-[9px] text-gray-600 uppercase tracking-widest">© 2026 THE FLOCK. ALL RIGHTS RESERVED.</p>
      </footer>
    </>
  )
}

export default Footer