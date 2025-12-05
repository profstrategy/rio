'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GiEngagementRing, GiMountainClimbing } from 'react-icons/gi'
import { MdArtTrack, MdConnectingAirports } from 'react-icons/md'
import { BiArrowFromBottom } from 'react-icons/bi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppHeading } from '@/components/reusables/app-heading'

const howItWorks = [
    {
        id: 0,
        step: 'Step 1',
        title: 'Visit & Connect',
        body: 'Land on the website, see Rio branding and token info, then connect your Twitter account through secure login',
        icon: <MdConnectingAirports />,
        color: 'from-sky-400 to-sky-600'
    },
    {
        id: 1,
        step: 'Step 2',
        title: 'Engage on Twitter',
        body: 'Tweet about $Rio, use hashtags like #RioOnBonk, retweet official posts, and interact with the community on Twitter',
        icon: <GiEngagementRing />,
        color: 'from-cyan-400 to-sky-600'
    },
    {
        id: 2,
        step: 'Step 3',
        title: 'Track Your Impact',
        body: 'View your personalized dashboard showing your Twitter engagement stats, contributions, and current leaderboard ranking',
        icon: <MdArtTrack />,
        color: 'from-sky-500 to-cyan-600'
    },
    {
        id: 3,
        step: 'Step 4',
        title: 'Compete & Climb',
        body: 'Check the leaderboard to see top community supporters, earn badges/rewards, and increase your rank through more Twitter activity',
        icon: <GiMountainClimbing />,
        color: 'from-cyan-300 to-sky-500'
    }
]

const HowItWorks = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [expandedStep, setExpandedStep] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleStep = (stepId: any) => {
        setExpandedStep(expandedStep === stepId ? null : stepId);
    };

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
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className='relative bg-black border-0 backdrop-blur-lg container'
            style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
        >
            <motion.div
                variants={itemVariants}
                className="relative" >
                <AppHeading
                    variant='h2'
                    className='text-2xl md:text-3xl font-bold text-white/70 drop-shadow-lg bg-clip-text relative z-10'
                >
                    How it works
                </AppHeading>

                <div style={{ padding: '1rem' }}>
                    {isMobile ? (
                        /* Mobile Dropdown Layout */
                        <div className="flex flex-col gap-4" >
                            {howItWorks.map((item, _) => (
                                <div
                                    key={item.id}
                                    className="border rounded-xl overflow-hidden"
                                    style={{
                                        paddingInline: '.5rem',
                                        borderColor: 'rgba(56, 189, 248, 0.2)'
                                    }}
                                >
                                    <button
                                        onClick={() => toggleStep(item.id)}
                                        className="w-full p-4 text-left transition-all duration-300 flex items-center justify-between"
                                        style={{
                                            backgroundColor: 'rgba(14, 165, 233, 0.08)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.08)';
                                        }}
                                        aria-expanded={expandedStep === item.id}
                                        aria-controls={`step-content-${item.id}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-lg shadow-lg`}
                                                style={{
                                                    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.4)'
                                                }}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <CardDescription
                                                    className="text-xs opacity-90 font-medium text-sky-300"
                                                >
                                                    {item.step}
                                                </CardDescription>
                                                <CardTitle
                                                    className="text-sm font-semibold text-sky-100"
                                                >
                                                    {item.title}
                                                </CardTitle>
                                            </div>
                                        </div>
                                        <div
                                            className={`transform transition-transform duration-300 text-sky-200 ${expandedStep === item.id ? 'rotate-180' : ''}`}
                                        >
                                            <BiArrowFromBottom size={20} />
                                        </div>
                                    </button>

                                    <div
                                        id={`step-content-${item.id}`}
                                        className={`transition-all duration-300 overflow-hidden ${expandedStep === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div
                                            className="bg-black/20 border-t"
                                            style={{
                                                borderColor: 'rgba(56, 189, 248, 0.2)',
                                                padding: '1rem'
                                            }}
                                        >
                                            <p
                                                className="leading-relaxed text-sm text-sky-50"
                                            >
                                                {item.body}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Desktop Grid Layout */
                        <div className='grid grid-cols-2 gap-4'>
                            {howItWorks.map((item, _) => (
                                <div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    <Card
                                        className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 transition-all duration-300"
                                        style={{
                                            padding: '.5rem',
                                            border: '1px solid rgba(56, 189, 248, 0.2)',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div
                                                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110`}
                                                    style={{
                                                        boxShadow: '0 6px 16px rgba(56, 189, 248, 0.5)'
                                                    }}
                                                >
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <CardDescription
                                                        className="font-medium text-md opacity-90 text-sky-300"
                                                    >
                                                        {item.step}
                                                    </CardDescription>
                                                    <CardTitle
                                                        className="text-sm font-semibold text-sky-100"
                                                    >
                                                        {item.title}
                                                    </CardTitle>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pt-0">
                                            <p
                                                className="leading-relaxed text-sm text-sky-50"
                                            >
                                                {item.body}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default HowItWorks