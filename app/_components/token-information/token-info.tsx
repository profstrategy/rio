'use client'
// import { MdOutlineBlurCircular } from 'react-icons/md';
import { motion } from 'framer-motion';
// import { SiVirustotal } from 'react-icons/si';
// import { HiStatusOnline } from 'react-icons/hi';
import { AppHeading } from '@/components/reusables/app-heading';
import AppButton from '@/components/ui/app-button';
import React, { useState, useEffect } from 'react'
import AppDialogBox from '@/components/reusables/alert-dialog';
import { useAppDialog } from '@/hooks/use-app-dialog';
import { LeaderboardEmptyState } from '@/components/reusables/empty-states';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};


const TokenInfo = () => {
    const [mounted, setMounted] = useState(false);
    // const [animatedSupply, setAnimatedSupply] = useState(0);
    // const [animatedTotal, setAnimatedTotal] = useState(0);

    const { openDialog, dialogProps } = useAppDialog()

    // const targetCirculating = 4675474;
    // const targetTotal = 4675474685;

    useEffect(() => {
        setMounted(true);

        // Animate numbers on mount
        // const animateNumbers = () => {
        //     const duration = 2000; // 2 seconds
        //     const steps = 60;
        //     const stepDuration = duration / steps;

        //     let currentStep = 0;
        //     const timer = setInterval(() => {
        //         currentStep++;
        //         const progress = currentStep / steps;

        //         setAnimatedSupply(Math.floor(targetCirculating * progress));
        //         setAnimatedTotal(Math.floor(targetTotal * progress));

        //         if (currentStep >= steps) {
        //             clearInterval(timer);
        //             setAnimatedSupply(targetCirculating);
        //             setAnimatedTotal(targetTotal);
        //         }
        //     }, stepDuration);

        //     return () => clearInterval(timer);
        // };

        // const cleanup = animateNumbers();
        // return cleanup;
    }, []);

    // const formatNumber = (num: number) => {
    //     return num.toLocaleString();
    // };

    if (!mounted) {
        return (
            <main className='flex flex-col gap-4'>
                <div className="h-16 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg animate-pulse" />
            </main>
        );
    }

    return (
        <motion.main
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className='h-auto relative w-full col-span-2 container' role="complementary" aria-label="Token Information Section" id='token' style={{ marginBottom: '1rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
            {/* Background Rio Character - Blu the Macaw */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                <div
                    className="absolute top-4 left-4 w-48 h-48 opacity-5 bg-cover bg-center bg-no-repeat transform -rotate-12 scale-125"
                    style={{
                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><style>.a{fill:%23fff}</style></defs><ellipse class="a" cx="100" cy="60" rx="25" ry="35"/><circle class="a" cx="90" cy="50" r="6"/><circle class="a" cx="110" cy="50" r="6"/><path class="a" d="M100,70c-3,0-5,2-5,5s2,5,5,5,5-2,5-5S103,70,100,70z"/><ellipse class="a" cx="75" cy="40" rx="15" ry="25" transform="rotate(-30)"/><ellipse class="a" cx="125" cy="40" rx="15" ry="25" transform="rotate(30)"/></svg>')`,
                        filter: 'blur(1px)'
                    }}
                    aria-hidden="true"
                />
            </div>

            {/* Floating Macaw Birds Animation - Smaller set for token info */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => (
                    <div
                        key={`token-macaw-${i}`}
                        className="absolute text-base opacity-40 animate-float"
                        style={{
                            left: `${15 + (i * 15)}%`,
                            top: `${25 + (i * 12)}%`,
                            animationDelay: `${i * 1.2}s`,
                            animationDuration: `${5 + (i % 2)}s`
                        }}
                    >
                        🪙
                    </div>
                ))}
            </div>

            <motion.div
                variants={itemVariants}
            >
                <AppHeading
                    variant='h2'
                    className='text-2xl md:text-3xl font-bold text-white/70 drop-shadow-lg bg-clip-text relative z-10 mar-b'
                >
                    Token Information
                </AppHeading>

                <div className="relative overflow-hidden rounded-xl">
                    {/* Animated Shimmer Border */}
                    <div className="absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r from-cyan-400 via-blue-500  to-cyan-400 animate-spin-slow">
                    <div className="w-full h-full rounded-xl" style={{
                        background: 'radial-gradient(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)'
                    }} />
                </div>

                    {/* Content Container */}
                    <div
                        className='relative h-auto rounded-xl backdrop-blur-sm'
                        style={{
                            background: 'radial-gradient(ellipse at center right, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)',
                            backdropFilter: 'blur(18px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '1rem',
                            marginTop: '1rem'
                        }}
                    >
                        <div className='flex flex-col gap-6 text-white'>

                            {/* Token Symbol and Icon */}
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-20 h-16 lg:h-20 md:h-16  bg-gradient-to-br from-orange-400 to-cyan-400 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg animate-pulse">
                                    $RIO
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                                        TOKEN
                                    </h2>
                                    {/* <p className="text-sm text-white/60">The Rare Bird That Flies Above The Noise</p> */}
                                </div>
                            </div>

                            {/* Token Stats */}
                            <div className="flex flex-col gap-4">
                                <LeaderboardEmptyState message='Coming Soon' />
                                {/* Circulating Supply */}
                                {/* <div
                                    className='flex justify-between items-center rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-[1.02]'
                                    role="group"
                                    aria-label="Circulating Supply Information"
                                    style={{
                                        paddingInline: '1rem'
                                    }}
                                >
                                    <div className="flex items-center gap-3"
                                    >
                                        <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center">
                                            <span className="text-cyan-400 text-sm"><MdOutlineBlurCircular /></span>
                                        </div>
                                        <AppHeading variant='h4' className="text-cyan-300 font-semibold">
                                            Circulating Supply
                                        </AppHeading>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                            {formatNumber(animatedSupply)}
                                        </p>
                                        <p className="text-xs text-white/50">RIO Tokens</p>
                                    </div>
                                </div> */}

                                {/* Total Supply */}
                                {/* <div
                                    className='flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02]'
                                    role="group"
                                    aria-label="Total Supply Information"
                                    style={{
                                        paddingInline: '1rem'
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center">
                                            <span className="text-purple-400 text-sm"><SiVirustotal /></span>
                                        </div>
                                        <AppHeading variant='h4' className="text-purple-300 font-semibold">
                                            Total Supply
                                        </AppHeading>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            {formatNumber(animatedTotal)}
                                        </p>
                                        <p className="text-xs text-white/50">RIO Tokens</p>
                                    </div>
                                </div> */}

                                {/* Market Cap Placeholder */}
                                {/* <div
                                    className='flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02]'
                                    role="group"
                                    aria-label="Market Information"
                                    style={{
                                        paddingInline: '1rem'
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-400/20 rounded-full flex items-center justify-center">
                                            <span className="text-orange-400 text-sm"><HiStatusOnline /></span>
                                        </div>
                                        <AppHeading variant='h4' className="text-orange-300 font-semibold">
                                            Market Status
                                        </AppHeading>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                            SOARING 🚀
                                        </p>
                                        <p className="text-xs text-white/50">Above The Noise</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* Action Button */}
                            <div className='flex justify-center pt-4'>
                                <AppButton
                                    className='w-full max-w-xs text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rio-fire-500/50 focus:ring-offset-2 focus:ring-offset-rio-fire-200 border-b-2'
                                    aria-label="View RIO Token Whitepaper"
                                    onClick={openDialog}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        📄 View Whitepaper
                                    </span>
                                </AppButton>
                            </div>

                            {dialogProps.open && <AppDialogBox {...dialogProps} />}

                            {/* Additional Info */}
                            <div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/10">
                                <p className="text-center text-sm text-white/70 italic">
                                    "Like Blu escaping captivity, $RIO breaks free from traditional constraints to soar in the DeFi skies."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg) scale(1);
                    }
                    25% {
                        transform: translateY(-10px) rotate(10deg) scale(1.1);
                    }
                    50% {
                        transform: translateY(-5px) rotate(-5deg) scale(0.9);
                    }
                    75% {
                        transform: translateY(-8px) rotate(5deg) scale(1.05);
                    }
                }

                @keyframes spin-slow {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .animate-float {
                    animation: float 7s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }

                /* Focus styles for accessibility */
                *:focus-visible {
                    outline: 2px solid #06b6d4;
                    outline-offset: 2px;
                }

                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .text-white\\/90,
                    .text-white\\/70,
                    .text-white\\/60,
                    .text-white\\/50 {
                        color: white !important;
                    }
                    .border-white\\/10,
                    .border-white\\/20 {
                        border-color: white !important;
                    }
                }

                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .animate-float,
                    .animate-spin-slow,
                    .animate-pulse {
                        animation: none !important;
                    }
                    
                    .transition-all {
                        transition: none !important;
                    }
                    
                    .hover\\:scale-105,
                    .hover\\:scale-\\[1\\.02\\] {
                        transform: none !important;
                    }
                }

                /* Mobile responsiveness */
                @media (max-width: 768px) {
                    .col-span-2 {
                        padding: 0.5rem;
                    }
                    
                    .text-2xl {
                        font-size: 1.5rem;
                    }
                    
                    .max-w-xs {
                        max-width: 100%;
                    }
                    
                    .gap-4 {
                        gap: 0.75rem;
                    }
                    
                    .p-6 {
                        padding: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .w-16 {
                        width: 3rem;
                        height: 3rem;
                    }
                    
                    .text-xl {
                        font-size: 1.125rem;
                    }
                    
                    .py-4 {
                        padding-top: 0.75rem;
                        padding-bottom: 0.75rem;
                    }
                }

                /* Custom gradient utilities */
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </motion.main>
    )
}

export default TokenInfo