"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppButton from '@/components/ui/app-button';

export default function RioLandingPage() {
  // --- State Management (Replacing Alpine.js) ---
  const [idoModalOpen, setIdoModalOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    DAYS: '00',
    HOURS: '00',
    MINS: '00',
    SECS: '00'
  });

  // --- Effects ---
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1200, once: true });

    // Initialize Countdown
    const target = new Date("Jan 20, 2026 00:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const d = target - now;

      if (d > 0) {
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
      {/* Injecting Fonts and Custom CSS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Syncopate:wght@400;700&display=swap');
        
        :root {
          --rio-blue: #00D2FF;
          --rio-green: #3AFFAD;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #020617;
          color: #f8fafc;
          overflow-x: hidden;
        }

        .font-sync { font-family: 'Syncopate', sans-serif; }

        /* Glassmorphism Ultra */
        .glass-premium {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Animated Tropical Vine Roadmap */
        .roadmap-vine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--rio-green), var(--rio-blue), transparent);
          box-shadow: 0 0 15px rgba(58, 255, 173, 0.5);
        }

        /* Hero Text Gradient */
        .text-gradient {
          background: linear-gradient(90deg, #00D2FF, #3AFFAD);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-glow:hover {
          box-shadow: 0 0 30px rgba(0, 210, 255, 0.4);
          transform: translateY(-2px);
        }

        /* Character Hover Effect */
        .flock-card:hover img {
          transform: scale(1.1) rotate(2deg);
          filter: brightness(1.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-premium rounded-full px-8 py-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-10 h-10 rounded-full border border-blue-500 shadow-lg" alt="Logo" />
            <span className="font-sync text-xl font-bold tracking-tighter">$RIO</span>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
            <a href="#home" className="hover:text-white transition">Home</a>
            <a href="#ido" className="hover:text-white transition">IDO</a>
            <a href="#tokenomics" className="hover:text-white transition">Economics</a>
            <a href="#roadmap" className="hover:text-white transition">Path</a>
          </div>
          <button 
            onClick={() => setIdoModalOpen(true)} 
            className="bg-blue-600 px-6 py-2 rounded-full text-xs font-bold btn-glow transition-all"
          >
            CONNECT
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
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

      {/* --- IDO SECTION --- */}
      <section id="ido" className="py-32 px-6">
        <div className="max-w-6xl mx-auto glass-premium rounded-[40px] p-12 border-t border-white/10" data-aos="fade-up">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-sync text-4xl mb-6">ONBONK IDO LAUNCH</h2>
              <p className="text-gray-400 mb-12 uppercase tracking-widest text-sm font-bold">The Yapping Era Begins — 20 Jan 2026</p>
              
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
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Max Participation</span> <span className="text-blue-400">$78</span></div>
                <div className="flex justify-between"><span>Token Price</span> <span className="text-green-400">$0.001</span></div>
              </div>
              <button 
                onClick={() => setIdoModalOpen(true)} 
                className="w-full py-5 bg-white text-black rounded-2xl font-bold mt-10 hover:bg-blue-400 hover:text-white transition-all shadow-xl"
              >
                PARTICIPATE NOW
              </button>
            </div>
          </div>
        </div>
      </section>

            {/* --- HOW TO PARTICIPATE --- */}
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
            <p className="text-gray-400 text-sm leading-relaxed">Choose your investment tier ($38 - $78) to acquire your $RIO tokens.</p>
          </div>
          <div className="glass-premium p-10 rounded-[40px] text-center group hover:border-blue-500/50 transition-all" data-aos="fade-up" data-aos-delay="200">
            <span className="step-number text-6xl font-bold block mb-6">3</span>
            <h3 className="font-sync text-lg mb-4 uppercase">Purchase Tokens</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Confirm the transaction and watch your $RIO tokens take flight in your wallet.</p>
          </div>
        </div>
      </section>

      {/* --- FLOCK GALLERY --- */}
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

      {/* --- TOKENOMICS --- */}
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

      {/* --- ROADMAP --- */}
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

      {/* --- LEADERBOARD SECTION --- */}
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
            {/* Blurred Background */}
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

            {/* Lock Overlay */}
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

      {/* --- CHART --- */}
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

      {/* --- FOOTER --- */}
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
  );
}