'use client';
import React, { useState, useEffect } from 'react';
import ComingSoonHeader from './coming-soon-header';
// import { FaTwitter } from "react-icons/fa";

const RioComingSoon = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const [mounted, setMounted] = useState(false);

    // Mount effect for animations
    useEffect(() => {
        setMounted(true);
    }, []);


    const handleSubscribe = () => {
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    if (!mounted) {
        return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Particles */}
                {Array.from({ length: 20 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-cyan-400 rounded-full opacity-60 animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,107,53,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,219,0.1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>

                {/* Glow Effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                />
            </div>

            {/* Main Content */}
            <div className=" max-w-7xl rio-container relative z-10 mb-4 m-auto gap-8 min-h-screen flex flex-col justify-center items-center">
                <ComingSoonHeader />

                {/* Key Features */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">

                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 text-center group hover:border-orange-500/40 hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🐦</div>
                        <h3 className="text-xl font-bold text-white mb-2">Twitter Integration</h3>
                        <p className="text-gray-400 text-sm">Track community engagement and climb the leaderboard</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center group hover:border-cyan-500/40 hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
                        <h3 className="text-xl font-bold text-white mb-2">Community Rewards</h3>
                        <p className="text-gray-400 text-sm">Earn recognition for supporting the flock</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 text-center group hover:border-purple-500/40 hover:scale-105 transition-all duration-300 mb-4">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✈️</div>
                        <h3 className="text-xl font-bold text-white mb-2">Creative Freedom</h3>
                        <p className="text-gray-400 text-sm">Break free from copy-paste dog coins</p>
                    </div>
                </div>

                {/* Email Subscription */}
                {/* <div className="max-w-md mx-auto mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800/80 backdrop-blur-sm border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 active:scale-95 disabled:opacity-50"
              disabled={isSubscribed}
            >
              {isSubscribed ? '✓' : 'Notify Me'}
            </button>
          </div>
          {isSubscribed && (
            <p className="text-green-400 text-center mt-3 font-medium animate-pulse">
              🎉 You'll be the first to know when $RIO takes flight!
            </p>
          )}
        </div> */}

                {/* Social Links */}
                {/* <div className="flex justify-center gap-6 mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
          {[
            { icon: '🐦', label: 'Twitter', color: 'from-blue-500 to-cyan-500' },
            { icon: '💬', label: 'Telegram', color: 'from-blue-400 to-blue-600' },
            { icon: '👾', label: 'Discord', color: 'from-purple-500 to-indigo-500' }
          ].map((social) => (
            <button
              key={social.label}
              className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 hover:rotate-6`}
            >
              {social.icon}
            </button>
          ))}
        </div> */}

                {/* Bottom CTA */}
                {/* <div className="text-center opacity-0 animate-[fadeInUp_1s_ease-out_1.4s_forwards]">
                    <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-cyan-500 text-white font-bold text-lg rounded-full shadow-2xl shadow-orange-500/30 transition-all duration-500 hover:shadow-3xl hover:shadow-orange-500/50 hover:scale-110 active:scale-95">
                        <span>🚀</span>
                        <span>Join the Migration</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <p className="text-gray-500 text-sm mt-4 max-w-md mx-auto">
                        Be part of the revolution that's soaring above the crowded meme landscape
                    </p>
                </div> */}
            </div>

            {/* Footer */}
            {/* <div className="relative z-10 text-center py-8 border-t border-gray-800 opacity-0 animate-[fadeInUp_1s_ease-out_1.6s_forwards]">
                <p className="text-gray-600 text-sm">
                    © 2025 $RIO on BONK. The meme that escaped captivity.
                </p>
            </div> */}

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default RioComingSoon;