"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function WhitepaperPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600&family=Syncopate:wght@400;700&display=swap');
        
        :root {
          --rio-blue: #00D2FF;
          --rio-green: #3AFFAD;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #020617;
          color: #e2e8f0;
          overflow-x: hidden;
        }

        .font-sync { font-family: 'Syncopate', sans-serif; }

        /* Glassmorphism Ultra - optimized for reading */
        .glass-doc {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .glass-sidebar {
          background: rgba(2, 6, 23, 0.8);
          backdrop-filter: blur(15px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Text Gradient */
        .text-gradient {
          background: linear-gradient(90deg, #00D2FF, #3AFFAD);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #00D2FF; border-radius: 3px; }

        /* Typography Styling for Doc */
        .prose h1, .prose h2, .prose h3 { font-family: 'Syncopate', sans-serif; color: white; margin-top: 2em; margin-bottom: 0.5em; }
        .prose p { line-height: 1.8; margin-bottom: 1.5em; color: #94a3b8; }
        .prose ul { list-style: none; padding-left: 0; margin-bottom: 1.5em; }
        .prose li { position: relative; padding-left: 1.5em; margin-bottom: 0.5em; color: #cbd5e1; }
        .prose li::before { content: '•'; position: absolute; left: 0; color: var(--rio-green); font-weight: bold; }
        .prose strong { color: var(--rio-blue); font-weight: 600; }
      `}</style>

      {/* Fixed Header */}
      <nav className="fixed top-0 w-full z-50 glass-doc border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </div>
            <span className="font-sync text-sm font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="hidden md:block font-sync font-bold text-lg tracking-tighter">$RIO WHITE PAPER</span>
            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-green-500/20">V1.0</span>
          </div>

          <button className="md:hidden text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <a href="/RIO ON BONK WHITEPAPER 2.pdf" download className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] text-white">
            <span>DOWNLOAD PDF</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </a>
        </div>
      </nav>

      <div className="flex min-h-screen pt-20">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden md:block w-72 fixed h-full glass-sidebar overflow-y-auto p-8 z-40">
          <h4 className="font-sync text-xs text-blue-400 uppercase tracking-[0.2em] mb-8 font-bold">Contents</h4>
          <nav className="space-y-1">
            <a href="#anthem" className="block py-2 text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all border-l-2 border-transparent hover:border-blue-500 pl-4">Project Anthem</a>
            <a href="#intro" className="block py-2 text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all border-l-2 border-transparent hover:border-blue-500 pl-4">Introduction</a>
            <a href="#mission" className="block py-2 text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all border-l-2 border-transparent hover:border-blue-500 pl-4">The Mission</a>
            <a href="#tokenomics" className="block py-2 text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all border-l-2 border-transparent hover:border-blue-500 pl-4">Tokenomics</a>
            <a href="#principles" className="block py-2 text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all border-l-2 border-transparent hover:border-blue-500 pl-4">Key Principles</a>
            <a href="#roadmap" className="block py-2 text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all border-l-2 border-transparent hover:border-blue-500 pl-4">Roadmap</a>
          </nav>

          <div className="mt-20">
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-6 rounded-2xl border border-white/5 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Ready to Join?</p>
              <Link href="/#ido" className="block w-full py-3 bg-blue-600 rounded-xl text-xs font-bold hover:scale-105 transition-transform text-white">JOIN IDO</Link>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-8 md:hidden transition-opacity duration-200">
            <div className="flex justify-between items-center mb-10">
              <span className="font-sync text-xl font-bold text-white">$RIO DOCS</span>
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-6 text-center">
              <a href="#anthem" onClick={() => setSidebarOpen(false)} className="block text-xl font-bold text-gray-300">Anthem</a>
              <a href="#intro" onClick={() => setSidebarOpen(false)} className="block text-xl font-bold text-gray-300">Introduction</a>
              <a href="#tokenomics" onClick={() => setSidebarOpen(false)} className="block text-xl font-bold text-gray-300">Tokenomics</a>
              <a href="#roadmap" onClick={() => setSidebarOpen(false)} className="block text-xl font-bold text-gray-300">Roadmap</a>
              <a href="/RIO ON BONK WHITEPAPER 2.pdf" download className="block mt-10 py-4 bg-blue-600 rounded-xl font-bold text-white">DOWNLOAD PDF</a>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="w-full md:pl-72 relative">
          
          <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          <div className="fixed bottom-0 left-72 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

          <div className="max-w-4xl mx-auto px-6 py-20 prose prose-invert">
            
            <section id="anthem" className="mb-24" data-aos="fade-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 tracking-tighter">PROJECT ANTHEM</h1>
              <div className="glass-doc p-8 rounded-3xl border-l-4 border-blue-500">
                <p className="text-xl text-white italic leading-relaxed">
                  &quot;In the heart of the Solana jungle, where the beats hit harder and the vibes fly higher, a new bird takes flight.&quot;
                </p>
                <p>
                  RIO isn&rsquo;t just a token—it&rsquo;s a celebration. A rhythm. A movement. Born from color, crafted with community, powered by BONK, and fueled by pure joy.
                </p>
                <p className="font-bold text-blue-300">
                  We fly together. We build together. We rise together.
                </p>
                <p>
                  From the streets of the tropics to the heights of Web3. RIO is the sound of freedom, the spark of creativity, the anthem of the wild. Spread your wings. Shake the chain.
                </p>
                <p className="uppercase tracking-widest font-bold text-white mt-8">Welcome to RIO — where the blockchain comes alive.</p>
              </div>
            </section>

            <section id="intro" className="mb-24" data-aos="fade-up">
              <h2>Introduction</h2>
              <p>
                RIO is the colorful, rhythmic, hyper-community token taking flight on BONK. Inspired by the energy of carnival culture and the spirit of fearless adventure, RIO brings fun, movement, and creativity back to Solana with a brand built for virality, community, and culture.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="glass-doc p-6 rounded-2xl">
                  <h4 className="font-sync text-sm text-green-400 uppercase mb-2">Not Just A Token</h4>
                  <p className="text-sm m-0">A symbol of creative rebellion and a community-owned asset.</p>
                </div>
                <div className="glass-doc p-6 rounded-2xl">
                  <h4 className="font-sync text-sm text-blue-400 uppercase mb-2">SocialFi Power</h4>
                  <p className="text-sm m-0">A wave that rewards culture, creativity, and participation.</p>
                </div>
              </div>

              <p>
                When it comes to meme tokens, there is hype, excitement, alpha calls, and raids, but not anymore. The whole narrative on memes has reached a point of saturation. From the OG dogs to the countless copycats, the space is now all about low-effort projects that lack a distinct identity.
              </p>
              <p>
                <strong>$RIO changes everything.</strong> We are the anthem, the party, and the rebellion. It is a meme that flies where others bark.
              </p>
            </section>

            <section id="identity" className="mb-24" data-aos="fade-up">
              <h3>The RIO Identity</h3>
              <div className="glass-doc p-8 rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 blur-[60px] opacity-40"></div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <span className="font-sync font-bold text-white">Powered by BONK</span>
                    <span className="h-px flex-1 bg-white/10"></span>
                    <span className="text-gray-400">Like the tropics</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="font-sync font-bold text-white">Colorful</span>
                    <span className="h-px flex-1 bg-white/10"></span>
                    <span className="text-gray-400">Like the carnival</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="font-sync font-bold text-white">Loud</span>
                    <span className="h-px flex-1 bg-white/10"></span>
                    <span className="text-gray-400">Like a bird taking flight</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="font-sync font-bold text-white">Fearless</span>
                    <span className="h-px flex-1 bg-white/10"></span>
                    <span className="text-gray-400">Like the wild</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="font-sync font-bold text-white">Fast</span>
                    <span className="h-px flex-1 bg-white/10"></span>
                    <span className="text-gray-400">Like Solana gas fees</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="mission" className="mb-24" data-aos="fade-up">
              <h2>The Mission</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-blue-400">01. Escape</h3>
                  <p>The story of $RIO is the story of Blu. A bird that escapes captivity to find its true self. In parallel, $RIO breaks free from the trappings of the old meta: No fake utility, no unrealistic roadmaps.</p>
                </div>
                <div>
                  <h3 className="text-green-400">02. Fly</h3>
                  <p>$RIO represents the first meme bird to fly through the BONK jungle. The upward movement of the token is not just a price chart; it is a visual representation of the community&rsquo;s collective flight.</p>
                </div>
                <div>
                  <h3 className="text-purple-400">03. Culture</h3>
                  <p>Dogs bark. $RIO sings. We replace the usual &quot;bark&quot; with a symphony of sound, rhythm, and carnival vibes.</p>
                </div>
              </div>
            </section>

            <section id="tokenomics" className="mb-24" data-aos="fade-up">
              <h2 className="mb-10">Tokenomics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-doc p-6 rounded-2xl border-l-4 border-blue-500">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-sync font-bold text-2xl text-white">50%</span>
                    <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Liquidity</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs mt-3 mb-0">To protect price stability.</p>
                </div>

                <div className="glass-doc p-6 rounded-2xl border-l-4 border-green-400">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-sync font-bold text-2xl text-white">16%</span>
                    <span className="text-xs uppercase tracking-widest text-green-400 font-bold">Ecosystem</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full" style={{ width: '16%' }}></div>
                  </div>
                  <p className="text-xs mt-3 mb-0">Airdrops, staking, rewards.</p>
                </div>

                <div className="glass-doc p-6 rounded-2xl border-l-4 border-purple-400">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-sync font-bold text-2xl text-white">13%</span>
                    <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Presale</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full" style={{ width: '13%' }}></div>
                  </div>
                  <p className="text-xs mt-3 mb-0">Initial distribution.</p>
                </div>

                <div className="glass-doc p-6 rounded-2xl border-l-4 border-orange-400">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-sync font-bold text-2xl text-white">10%</span>
                    <span className="text-xs uppercase tracking-widest text-orange-400 font-bold">Team</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full" style={{ width: '10%' }}></div>
                  </div>
                  <p className="text-xs mt-3 mb-0">Locked for 14 months.</p>
                </div>
                
                <div className="glass-doc p-4 rounded-xl text-center">
                  <span className="block font-bold text-white mb-1">6%</span>
                  <span className="text-[10px] uppercase text-gray-500">Marketing</span>
                </div>
                <div className="glass-doc p-4 rounded-xl text-center">
                  <span className="block font-bold text-white mb-1">5%</span>
                  <span className="text-[10px] uppercase text-gray-500">Partnerships</span>
                </div>
              </div>
            </section>

            <section id="principles" className="mb-24" data-aos="fade-up">
              <h2>Key Principles</h2>
              <ul>
                <li><strong>Fair Launch:</strong> Majority of tokens are public. No whale games.</li>
                <li><strong>100% Community Ownership:</strong> The project&rsquo;s fate is in the hands of its participants.</li>
                <li><strong>Bird-Themed Mechanics:</strong> Future burn mechanics (&quot;Rebirth&quot;) to create scarcity.</li>
                <li><strong>Create. Fly. Earn:</strong> Incentivised content creation (music, memes, art).</li>
              </ul>
            </section>

            <section id="roadmap" className="mb-32" data-aos="fade-up">
              <h2>Roadmap</h2>
              
              <div className="relative border-l-2 border-white/10 ml-4 space-y-12 py-4">
                <div className="relative pl-10">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                  <h4 className="font-sync text-lg text-white mb-2">Phase 1: Foundation</h4>
                  <p className="text-sm">Brand identity, Social launch, Community onboarding, Website V1.</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
                  <h4 className="font-sync text-lg text-white mb-2">Phase 2: The Yapping Era (Social-Fi)</h4>
                  <p className="text-sm">
                    <strong>Social-Fi Meta:</strong> Information becomes an asset.<br/>
                    <strong>Deliverables:</strong> Daily insights, META Channels, Holder-Only content.<br/>
                    <strong>Events:</strong> Public Sale (IDO), TGE, DEX Listings, Liquidity Activation.
                  </p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-400"></div>
                  <h4 className="font-sync text-lg text-white mb-2">Phase 3: The Flight</h4>
                  <p className="text-sm">CEX Listing campaigns, &quot;Bonk Jungle&quot; ecosystem partnerships, InfoFi expansion.</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-400"></div>
                  <h4 className="font-sync text-lg text-white mb-2">Phase 4: The Carnival</h4>
                  <p className="text-sm">NFTs, Burn/Rebirth mechanics, Global carnival presence.</p>
                </div>
              </div>

              <div className="mt-16 text-center glass-doc p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl mb-2 font-sync text-gray-500">V2 Coming Soon...</h3>
                <p className="text-sm">The Anthem is just beginning.</p>
              </div>
            </section>

            <footer className="border-t border-white/5 pt-10 pb-20 text-center text-xs text-gray-500 uppercase tracking-widest">
              <p className="mb-4">Post. Yap. Fly. Earn.</p>
              <p>© 2026 $RIO ON BONK. ALL RIGHTS RESERVED.</p>
            </footer>

          </div>
        </main>
      </div>
    </>
  );
}