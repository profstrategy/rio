'use client'
import React from 'react';

const RioLoadingFallback = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-sky-950 to-indigo-950 animate-pulse"
                style={{ animationDuration: '4s' }} />
            
            {/* Color Accent Layer */}
            <div className="absolute inset-0 bg-linear-to-tr from-sky-900/60 via-transparent to-cyan-900/60" />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 30 }, (_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="absolute animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    >
                        <div className="w-2 h-2 bg-linear-to-br from-sky-400 to-cyan-500 rounded-full shadow-lg opacity-40" />
                    </div>
                ))}
            </div>

            {/* Subtle Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-radial from-sky-600/20 via-sky-800/10 to-transparent rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-radial from-cyan-600/20 via-indigo-800/10 to-transparent rounded-full blur-2xl animate-pulse"
                style={{ animationDuration: '4s', animationDelay: '1s' }} />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-4">
                {/* Logo Container with Pulsing Ring */}
                <div className="relative">
                    {/* Outer Pulsing Ring */}
                    <div className="absolute inset-0 -m-4 rounded-full border-4 border-sky-400/30 animate-ping" 
                        style={{ animationDuration: '2s' }} />
                    
                    {/* Middle Ring */}
                    <div className="absolute inset-0 -m-2 rounded-full border-2 border-cyan-400/40 animate-pulse" 
                        style={{ animationDuration: '1.5s' }} />
                    
                    {/* Logo Background Glow */}
                    <div className="absolute inset-0 bg-linear-to-br from-sky-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" 
                        style={{ animationDuration: '2s' }} />
                    
                    {/* Logo */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 bg-linear-to-br from-sky-400/10 to-cyan-400/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-sky-400/30 shadow-2xl">
                        <img 
                            src="/rio-logo.png" 
                            alt="Rio Logo" 
                            className="w-24 h-24 md:w-32 md:h-32 object-contain animate-pulse"
                            style={{ animationDuration: '2s' }}
                        />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight animate-pulse">
                        Loading
                        <span className="inline-flex ml-1">
                            <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                        </span>
                    </h2>

                    {/* Progress Bar */}
                    <div className="w-64 md:w-80 h-2 bg-sky-950/50 rounded-full overflow-hidden backdrop-blur-sm border border-sky-500/20">
                        <div className="h-full bg-linear-to-r from-sky-400 via-cyan-400 to-sky-400 rounded-full animate-shimmer"
                            style={{
                                animation: 'shimmer 2s ease-in-out infinite',
                                backgroundSize: '200% 100%'
                            }}
                        />
                    </div>

                    {/* Subtitle */}
                    <p className="text-sky-300/80 text-sm md:text-base font-medium animate-pulse">
                        Preparing your experience...
                    </p>
                </div>

                {/* Orbiting Dots */}
                <div className="relative w-24 h-24">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="absolute inset-0 animate-spin"
                            style={{
                                animationDuration: '3s',
                                animationDelay: `${i * 0.2}s`
                            }}
                        >
                            <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-linear-to-br from-sky-400 to-cyan-500 rounded-full shadow-lg shadow-sky-400/50" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default RioLoadingFallback;