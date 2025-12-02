'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GiEngagementRing, GiMountainClimbing } from 'react-icons/gi'
import { MdArtTrack, MdConnectingAirports } from 'react-icons/md'

const howItWorks = [
    {
        id: 0,
        step: 'Step 1',
        title: 'Visit & Connect',
        body: 'Land on the website, see Rio branding and token info, then connect your Twitter account through secure login',
        icon: <MdConnectingAirports />,
        color: 'from-cyan-400 to-blue-500'
    },
    {
        id: 1,
        step: 'Step 2',
        title: 'Engage on Twitter',
        body: 'Tweet about $Rio, use hashtags like #RioOnBonk, retweet official posts, and interact with the community on Twitter',
        icon: <GiEngagementRing />,
        color: 'from-blue-400 to-purple-500'
    },
    {
        id: 2,
        step: 'Step 3',
        title: 'Track Your Impact',
        body: 'View your personalized dashboard showing your Twitter engagement stats, contributions, and current leaderboard ranking',
        icon: <MdArtTrack />,
        color: 'from-purple-400 to-pink-500'
    },
    {
        id: 3,
        step: 'Step 4',
        title: 'Compete & Climb',
        body: 'Check the leaderboard to see top community supporters, earn badges/rewards, and increase your rank through more Twitter activity',
        icon: <GiMountainClimbing />,
        color: 'from-pink-400 to-orange-500'
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
            className="relative">
            {/* Shimmer Border */}
            <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-r from-cyan-400 via-purple-500  to-cyan-400 animate-spin-slow" style={{ animationDelay: '20s' }}>
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90" />
            </div>

            <Card className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-0 backdrop-blur-lg">
                <motion.div
                    variants={itemVariants} >
                    <CardHeader className="">

                        <CardTitle className="text-white text-2xl text-center" style={{
                            paddingTop: '.5rem'
                        }}>
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                                HOW IT WORKS
                            </span>
                        </CardTitle>
                    </CardHeader>

                    <div className="px-6 pb-6">
                        {isMobile ? (
                            /* Mobile Dropdown Layout */
                            <div className="flex flex-col gap-4" style={{
                                paddingInline: '.2rem'
                            }} >
                                {howItWorks.map((item, _) => (
                                    <div key={item.id} className="border border-white/10 rounded-xl overflow-hidden" >
                                        <button
                                            onClick={() => toggleStep(item.id)}
                                            className="w-full p-4 text-left bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-between"
                                            aria-expanded={expandedStep === item.id}
                                            aria-controls={`step-content-${item.id}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-lg`}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <CardDescription className="text-white/60 text-xs opacity-80">
                                                        {item.step}
                                                    </CardDescription>
                                                    <CardTitle className="text-white text-sm font-semibold">
                                                        {item.title}
                                                    </CardTitle>
                                                </div>
                                            </div>
                                            <div className={`transform transition-transform duration-300 text-white/60 ${expandedStep === item.id ? 'rotate-180' : ''
                                                }`}>
                                                ▼
                                            </div>
                                        </button>

                                        <div
                                            id={`step-content-${item.id}`}
                                            className={`transition-all duration-300 overflow-hidden ${expandedStep === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            <div className=" bg-black/20 border-t border-white/10">
                                                <p className="text-white/80 text-sm leading-relaxed" style={{
                                                    paddingInline: '.5rem'
                                                }}>
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
                                        className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105" style={{
                                            paddingInline: '.5rem'
                                        }}
                                    >
                                        {/* Step Card Shimmer Border */}
                                        {/* <div className={`absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90" />
                                                </div> */}

                                        <Card className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/10 hover:border-white/20 transition-all duration-300" style={{
                                            padding: '.5rem'
                                        }}>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-xl shadow-lg`}>
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <CardDescription className="text-white/60 text-xs font-medium opacity-80">
                                                            {item.step}
                                                        </CardDescription>
                                                        <CardTitle className="text-white text-sm font-semibold leading-tight">
                                                            {item.title}
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="pt-0">
                                                <p className="text-white/80 text-sm leading-relaxed">
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
            </Card>
        </motion.div>
    )
}

export default HowItWorks