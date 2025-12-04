'use client'
import { AppHeading } from '@/components/reusables/app-heading';
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { LeaderboardEmptyState } from '@/components/reusables/empty-states';

const LeaderBoard = () => {

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

    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mock leaderboard data with proper ranking
    const leaderboardData:any[] = [];

    // const filteredData = leaderboardData.filter(item =>
    //     item.user.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    if (!mounted) {
        return (
            <main className="col-span-3 rounded-xl flex flex-col gap-4">
                <div className="h-16 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg animate-pulse" />
            </main>
        );
    }

    return (
        <motion.main
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="" role="main" aria-label="Leaderboard Section" id='leaderboard'>
            {/* Background Rio Character - Nigel the Cockatoo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                <div
                    className="absolute bottom-0 right-0 w-64 h-64 opacity-5 bg-cover bg-center bg-no-repeat transform rotate-12 scale-150"
                    style={{
                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><style>.a{fill:%23fff}</style></defs><path class="a" d="M100,20c-15,0-30,8-40,20-8,10-12,25-10,40,2,12,8,22,18,28,8,5,18,7,28,5,12-2,22-10,28-20,5-8,7-18,5-28-2-12-8-22-18-28C105,32,102,20,100,20z"/><circle class="a" cx="85" cy="65" r="8"/><circle class="a" cx="115" cy="65" r="8"/><path class="a" d="M100,85c-5,0-8,3-8,8s3,8,8,8,8-3,8-8S105,85,100,85z"/></svg>')`,
                        filter: 'blur(1px)'
                    }}
                    aria-hidden="true"
                />
            </div>

            {/* Floating Macaw Birds Animation */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {Array.from({ length: 100 }, (_, i) => (
                    <div
                        key={`macaw-${i}`}
                        className="absolute text-lg opacity-60 animate-float"
                        style={{
                            left: `${10 + (i * 8)}%`,
                            top: `${20 + (i * 6)}%`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${4 + (i % 3)}s`
                        }}
                    >
                        🦜
                    </div>
                ))}
            </div> */}

            <motion.div variants={itemVariants}>
                <AppHeading
                    variant='h1'
                    className=' text-2xl md:text-3xl font-bold text-white/70 drop-shadow-lg bg-clip-text'
                >
                    Leaderboard
                </AppHeading>

                <div className='flex justify-end' style={{ marginTop: '4px' }}>
                    <div className="relative w-full md:w-6/12" style={{ marginBottom: '.5rem' }}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full h-10 px-4 pr-10 rounded-lg bg-black/30 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm'
                            placeholder='Search Users...'
                            aria-label="Search users in leaderboard"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-xl">
                    {/* Animated Shimmer Border */}
                    {/* <div className="absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r from-orange-500 via-cyan-400 to-orange-500 animate-spin-slow">
                        <div className="w-full h-full rounded-xl" style={{
                            background: 'radial-gradient(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)'
                        }} />
                    </div> */}

                    {/* Table Container */}
                    <div
                        className='relative text-white/90 rounded-xl p-4 md:max-h-[35rem] max-h-[20rem] overflow-y-auto custom-scrollbar mb-4'
                        style={{
                            background: 'radial-gradient(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)',
                            backdropFilter: 'blur(10px)'
                        }}
                        role="region"
                        aria-label="Leaderboard table"
                        tabIndex={0}
                    >
                        {/* Table Header */}
                        <div className='flex justify-between items-center border-b border-white/20 pb-3 mb-4 sticky top-0 bg-inherit z-10'>
                            <div className='w-2/12 text-center font-semibold text-orange-300' role="columnheader">
                                Rank
                            </div>
                            <div className='w-6/12 text-center font-semibold text-cyan-300' role="columnheader">
                                User
                            </div>
                            <div className='w-4/12 text-center font-semibold text-pink-300' role="columnheader">
                                Points
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="space-y-2" role="table" aria-label="User rankings">
                            {leaderboardData.length > 0 ? (
                                leaderboardData.map((item, _) => (
                                    <div
                                        key={item.rank}
                                        className={`
                                        flex justify-between items-center min-h-12 px-3 py-2 rounded-lg
                                        transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                                        ${item.rank === 1 ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30' : ''}
                                        ${item.rank === 2 ? 'bg-gradient-to-r from-gray-300/10 to-gray-500/10 border border-gray-400/30' : ''}
                                        ${item.rank === 3 ? 'bg-gradient-to-r from-orange-700/10 to-yellow-700/10 border border-orange-600/30' : ''}
                                        ${item.rank > 3 ? 'bg-white/5 border border-white/10 hover:bg-white/10' : ''}
                                    `}
                                        role="row"
                                        tabIndex={0}
                                        aria-label={`Rank ${item.rank}: ${item.user} with ${item.points}`}
                                    >
                                        <div className='w-2/12 text-center flex items-center justify-center gap-2'>
                                            {item.rank <= 3 && (
                                                <span className="text-xl">
                                                    {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : '🥉'}
                                                </span>
                                            )}
                                            <span className={`font-bold ${item.rank === 1 ? 'text-yellow-300' : item.rank === 2 ? 'text-gray-300' : item.rank === 3 ? 'text-orange-300' : 'text-white'}`}>
                                                {item.rank}
                                            </span>
                                        </div>
                                        <div className='w-6/12 text-center flex items-center justify-center gap-3'>
                                            <span className="text-2xl animate-pulse">{item.avatar}</span>
                                            <span className="font-medium text-white truncate">{item.user}</span>
                                        </div>
                                        <div className='w-4/12 text-center'>
                                            <span className="font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                                                {item.points}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-white/60" role="status" aria-live="polite">
                                    <div className="text-4xl mb-4">🔍</div>
                                    <p>No users found matching "{searchTerm}"</p>
                                </div>
                            )}

                            {/* {leaderboardData && <LeaderboardEmptyState message='Coming soon' />} */}
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
                        transform: translateY(-15px) rotate(5deg) scale(1.1);
                    }
                    50% {
                        transform: translateY(-8px) rotate(-3deg) scale(0.95);
                    }
                    75% {
                        transform: translateY(-12px) rotate(2deg) scale(1.05);
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
                    animation: float 6s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }

                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(59, 130, 246, 0.5) rgba(0, 0, 0, 0.3);
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 3px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(45deg, #f97316, #ec4899, #06b6d4);
                    border-radius: 3px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(45deg, #ea580c, #db2777, #0891b2);
                }

                /* Focus styles for accessibility */
                *:focus-visible {
                    outline: 2px solid #06b6d4;
                    outline-offset: 2px;
                }

                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .text-white\\/90 {
                        color: white !important;
                    }
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
                }

                /* Mobile responsiveness */
                @media (max-width: 640px) {
                    .col-span-3 {
                        padding: 0.5rem;
                    }
                    
                    .text-2xl {
                        font-size: 1.5rem;
                    }
                    
                    .w-6\\/12 {
                        width: 60%;
                    }
                    
                    .w-2\\/12 {
                        width: 20%;
                    }
                    
                    .w-4\\/12 {
                        width: 20%;
                    }
                }

                @media (max-width: 480px) {
                    .min-h-12 {
                        min-height: 2.5rem;
                    }
                    
                    .text-lg {
                        font-size: 0.875rem;
                    }
                }
            `}</style>
        </motion.main>
    )
}

export default LeaderBoard