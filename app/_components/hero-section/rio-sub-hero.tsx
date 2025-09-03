'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';

const AboutRio = dynamic(() => import('@/app/_components/hero-section/about'), { ssr: false })
const HowItWorks = dynamic(() => import('@/app/_components/hero-section/how-it-works'), { ssr: false })

const RioSubHero = () => {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!mounted) {
        return (
            <main className='absolute lg::bottom-[44rem] w-full'>
                <div className="h-96 bg-gradient-to-t from-slate-900 to-transparent" />
            </main>
        );
    }

    return (
        <main
            className='absolute md:top-[24rem] top-1/5 w-full overflow-hidden expended-lg'
            style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.8) 20%, rgba(15,23,42,0.95) 100%)',
                backdropFilter: 'blur(10px)',
            }}
        >

            <div className='container mx-auto px-4 py-12'>
                <div className={`w-full max-w-7xl mx-auto grid ${isMobile ? 'grid-cols-1 gap-8' : ' lg:grid-cols-[400px_1fr] gap-8 items-start'}`}>
                    <AboutRio />
                    <HowItWorks />
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`

            .card-content {
            padding: '1rem'
            }

                /* Focus styles for accessibility */
                *:focus-visible {
                    outline: 2px solid #06b6d4;
                    outline-offset: 2px;
                }

                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .text-white\\/80,
                    .text-white\\/60,
                    .text-white\\/70 {
                        color: white !important;
                    }
                    .border-white\\/10,
                    .border-white\\/20 {
                        border-color: white !important;
                    }
                }
                    .hover\\:scale-105 {
                        transform: none !important;
                    }
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    
                    .py-12 {
                        padding-top: 2rem;
                        padding-bottom: 2rem;
                    }
                }

                @media (max-width: 480px) {
                    .text-2xl {
                        font-size: 1.5rem;
                    }
                    
                    .text-xl {
                        font-size: 1.125rem;
                    }
                }
            `}</style>
        </main>
    )
}

export default RioSubHero