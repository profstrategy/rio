'use client'
import { motion } from 'framer-motion';
import { AppHeading } from '@/components/reusables/app-heading';
import AppButton from '@/components/ui/app-button';
import React, { useState, useEffect } from 'react'
import AppDialogBox from '@/components/reusables/alert-dialog';
import { useAppDialog } from '@/hooks/use-app-dialog';
import { LightBoxImage } from '@/components/ui/light-box-image';
import TokenCard from './token-card';

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
    const { openDialog, dialogProps } = useAppDialog()


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <main className='flex flex-col gap-4'>
                <div className="h-16 bg-linear-to-r from-slate-800 to-slate-700 rounded-lg animate-pulse" />
            </main>
        );
    }

    return (
        <motion.main
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className=' h-auto relative w-full col-span-2 container' role="complementary" aria-label="Token Information Section" id='tokenomics' style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
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
                    TOKEN INFORMATION
                </AppHeading>

                <div className="relative overflow-hidden rounded-xl">
                    {/* Animated Shimmer Border */}
                    {/* <div className="absolute inset-0 rounded-xl p-0.5 bg-linear-to-r from-cyan-400 via-blue-500  to-cyan-400 animate-spin-slow">
                        <div className="w-full h-full rounded-xl" style={{
                            background: 'radial-linear(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)'
                        }} />
                    </div> */}

                    {/* Content Container */}
                    <div
                        className='relative h-auto rounded-xl backdrop-blur-sm'
                        style={{
                            background: 'radial-linear(ellipse at center right, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)',
                            backdropFilter: 'blur(18px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '1rem',
                            marginTop: '1rem'
                        }}
                    >
                        <div className='flex flex-col gap-6 text-white'>

                            {/* Token Symbol and Icon */}
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-20 h-16 lg:h-20 md:h-16 bg-linear-to-br from-orange-400 to-cyan-400 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg animate-pulse">
                                    $RIO
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold bg-linear-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                                        TOKENOMICS
                                    </h2>
                                </div>
                            </div>

                            <div className='grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-0 justify-center items-center'>
                                <div className="w-full relative max-h-[300px]">
                                    <LightBoxImage />
                                </div>
                                <TokenCard />
                            </div>

                            {dialogProps.open && <AppDialogBox {...dialogProps} />}

                            {/* Additional Info */}
                            <div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/10">
                                <p className="text-center text-sm text-white/70 italic">
                                    "Like Blu escaping captivity, $RIO breaks free from traditional constraints to soar in the DeFi skies."
                                </p>
                            </div>
                        </div>
                    </div>                </div>
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

            `}</style>
        </motion.main>
    )
}

export default TokenInfo