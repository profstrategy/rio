'use client'
import React, { useEffect, useState } from 'react'

const ComingSoonHeader = () => {
      const [timeLeft, setTimeLeft] = useState({
        days: 180,
        hours: 23,
        minutes: 42,
        seconds: 30
      });

        // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    return (
        <>
            {/* Header */}
            <div className="text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">

                {/* Logo/Icon */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-full mb-6 shadow-2xl shadow-orange-500/25 hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl">🦜</span>
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-cyan-400 bg-clip-text text-transparent leading-tight hover:scale-105 transition-transform duration-300">
                    $RIO
                </h1>

                {/* Slogan from the document */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4">
                    The Meme That Flew Over the Dogs
                </h2>

                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    The rare bird that flies above the noise. A culturally charged meme token bringing music, madness, and flight to the <span className="text-orange-400 font-semibold">BONK ecosystem</span>.
                </p>
            </div>

            {/* Coming Soon Badge */}
            <div className="text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
                <span className="inline-flex px-4 gap-2 justify-center items-center py-3 bg-gradient-to-r from-orange-500/20 to-cyan-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-300 font-semibold text-lg min-w-50">
                    <span className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse" />
                    Coming Soon
                </span>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 shadow-xl hover:border-orange-500/40 hover:scale-105 transition-all duration-300">
                            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                {value.toString().padStart(2, '0')}
                            </div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                                {unit}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ComingSoonHeader