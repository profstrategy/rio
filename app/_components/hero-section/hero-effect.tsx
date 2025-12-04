'use client';
import { heroImage } from '@/public';
import React, { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';

const HeaderEffect = ({children}: {children:ReactNode}) => {
    const [mounted, setMounted] = useState(false);

    // Mount effect for animations
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900" />;
    }

    return (
        <div>
            {/* Multi-layered Animated Background */}
            <div className="absolute overflow-hidden inset-0 bg-neutral-950" />

            {/* Tropical Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-pink-500/20 to-cyan-400/30 animate-pulse"
                style={{ animationDuration: '4s' }} />

            {/* Dynamic Macaw Color Waves */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/40 via-transparent to-cyan-500/40 animate-pulse"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                        animationDuration: '3s',
                        animationDelay: '0.5s'
                    }} />
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-pink-500/30 via-transparent to-yellow-500/30 animate-pulse"
                    style={{
                        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
                        animationDuration: '3.5s',
                        animationDelay: '1s'
                    }} />
            </div>

            {/* Floating Feather Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 50 }, (_, i) => (
                    <div
                        key={`feather-${i}`}
                        className="absolute animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full shadow-lg opacity-80" />
                    </div>
                ))}

                {/* Tropical Sparkles */}
                {Array.from({ length: 30 }, (_, i) => (
                    <div
                        key={`sparkle-${i}`}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70 animate-ping"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Animated Grid with Rio Colors */}
            <div className="absolute inset-0 opacity-15">
                <div
                    className="w-full h-full animate-pulse"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,165,0,0.4) 2px, transparent 2px),
                            linear-gradient(90deg, rgba(0,191,255,0.4) 2px, transparent 2px)
                        `,
                        backgroundSize: '60px 60px',
                        animationDuration: '6s'
                    }}
                />
            </div>

            {/* Large Animated Glow Effects */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-radial from-orange-400/30 via-pink-400/20 to-transparent rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-radial from-cyan-400/30 via-blue-400/20 to-transparent rounded-full blur-2xl animate-pulse"
                style={{ animationDuration: '3s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-yellow-400/25 via-orange-400/15 to-transparent rounded-full blur-xl animate-pulse"
                style={{ animationDuration: '5s', animationDelay: '2s' }} />

            {/* Hero Image with Enhanced Blend */}
            <div className="absolute inset-0">
                <Image
                    src={heroImage}
                    alt="hero-image"
                    fill
                    priority
                    className="w-full h-full object-cover opacity-60 mix-blend-soft-light contrast-125 saturate-125"
                />
            </div>

            {/* Cartoon-style Color Overlay for Sharpness */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-cyan-500/20 mix-blend-overlay" />

            {/* Sharp Highlight Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-yellow-200/10 mix-blend-screen" />

            {/* Shimmer Effect Overlay */}
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />

            {/* Content Area */}
            {children}

            {/* Additional CSS for fade-in animation */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default HeaderEffect;