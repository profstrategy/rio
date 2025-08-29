'use client'
import { BsTelegram } from 'react-icons/bs';
import { BsTwitterX } from 'react-icons/bs';
import { BsDiscord } from 'react-icons/bs';
import { BsSlack } from 'react-icons/bs';
import { AppHeading } from '@/components/reusables/app-heading';
import { motion } from 'framer-motion';
import React from 'react'

const SocialLinks = () => {

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

    return (
        <motion.main
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className='' role="complementary" aria-label="Contact Information Section" >

            <motion.div variants={itemVariants}>
                <AppHeading
                    variant='h1'
                    className=' text-2xl md:text-3xl font-bold bg-clip-text text-white/70 drop-shadow-lg '
                >
                    Community Links
                </AppHeading>

                <div className="relative overflow-hidden rounded-xl" style={{
                    marginTop: '.5rem'
                }}>
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
                            background: 'radial-gradient(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)',
                            padding: '1rem'
                        }}
                    >
                        <div className='flex flex-col gap-6 text-white'>

                            {/* Contact */}
                            <div className="flex flex-col gap-4">

                                <div
                                    className='flex justify-around items-center rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:scale-z-50 cursor-pointer'
                                    role="group"
                                    aria-label="Circulating Supply Information"
                                    style={{
                                        paddingInline: '1rem'
                                    }}
                                >
                                    <BsTelegram className='w-8 h-8' />
                                    <BsTwitterX className='w-8 h-8' />
                                    <BsDiscord className='w-8 h-8' />
                                    <BsSlack className='w-8 h-8' />
                                </div>
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

export default SocialLinks