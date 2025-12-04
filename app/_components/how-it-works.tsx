'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GiEngagementRing, GiMountainClimbing } from 'react-icons/gi'
import { MdArtTrack, MdConnectingAirports } from 'react-icons/md'
import { BiArrowFromBottom } from 'react-icons/bi'

const Card = ({ children, className, style }: any) => (
    <div className={className} style={style}>{children}</div>
);

const CardHeader = ({ children, className }: any) => (
    <div className={className}>{children}</div>
);

const CardContent = ({ children, className }: any) => (
    <div className={className}>{children}</div>
);

const CardTitle = ({ children, className }: any) => (
    <h3 className={className}>{children}</h3>
);

const CardDescription = ({ children, className }: any) => (
    <p className={className}>{children}</p>
);

const AppHeading = ({ children, className }: any) => (
    <h2 className={className}>{children}</h2>
);

const howItWorks = [
    {
        id: 0,
        step: 'Step 1',
        title: 'Visit & Connect',
        body: 'Land on the website, see Rio branding and token info, then connect your Twitter account through secure login',
        icon: <MdConnectingAirports />,
        color: 'from-[#FF8A3D] to-[#FF6B2C]'
    },
    {
        id: 1,
        step: 'Step 2',
        title: 'Engage on Twitter',
        body: 'Tweet about $Rio, use hashtags like #RioOnBonk, retweet official posts, and interact with the community on Twitter',
        icon: <GiEngagementRing />,
        color: 'from-[#FFA64D] to-[#F05A24]'
    },
    {
        id: 2,
        step: 'Step 3',
        title: 'Track Your Impact',
        body: 'View your personalized dashboard showing your Twitter engagement stats, contributions, and current leaderboard ranking',
        icon: <MdArtTrack />,
        color: 'from-[#FF6B2C] to-[#D94A1C]'
    },
    {
        id: 3,
        step: 'Step 4',
        title: 'Compete & Climb',
        body: 'Check the leaderboard to see top community supporters, earn badges/rewards, and increase your rank through more Twitter activity',
        icon: <GiMountainClimbing />,
        color: 'from-[#FFBA6B] to-[#FF8A3D]'
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
                                        borderColor: 'rgba(255, 186, 107, 0.15)'
                                    }}
                                >
                                    <button
                                        onClick={() => toggleStep(item.id)}
                                        className="w-full p-4 text-left transition-all duration-300 flex items-center justify-between"
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 138, 61, 0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                        }}
                                        aria-expanded={expandedStep === item.id}
                                        aria-controls={`step-content-${item.id}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-lg shadow-lg`}
                                                style={{
                                                    boxShadow: '0 4px 12px rgba(255, 107, 44, 0.3)'
                                                }}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <CardDescription
                                                    className="text-xs opacity-90 font-medium"
                                                    style={{ color: '#FFA64D' }}
                                                >
                                                    {item.step}
                                                </CardDescription>
                                                <CardTitle
                                                    className="text-sm font-semibold"
                                                    style={{ color: '#FFBA6B' }}
                                                >
                                                    {item.title}
                                                </CardTitle>
                                            </div>
                                        </div>
                                        <div
                                            className={`transform transition-transform duration-300 ${expandedStep === item.id ? 'rotate-180' : ''}`}
                                            style={{ color: '#FFD4A3' }}
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
                                                borderColor: 'rgba(255, 186, 107, 0.15)',
                                                padding: '1rem'
                                            }}
                                        >
                                            <p
                                                className="leading-relaxed text-sm"
                                                style={{ color: '#FFD4A3' }}
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
                                    {/* Step Card Shimmer Border */}
                                    {/* <div className={`absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90" />
                                                </div> */}

                                    <Card
                                        className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 transition-all duration-300"
                                        style={{
                                            padding: '.5rem',
                                            border: '1px solid rgba(255, 186, 107, 0.15)',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div
                                                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110`}
                                                    style={{
                                                        boxShadow: '0 6px 16px rgba(255, 107, 44, 0.4)'
                                                    }}
                                                >
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <CardDescription
                                                        className="font-medium text-md opacity-90"
                                                        style={{ color: '#FFA64D' }}
                                                    >
                                                        {item.step}
                                                    </CardDescription>
                                                    <CardTitle
                                                        className="text-sm font-semibold"
                                                        style={{ color: '#FFBA6B' }}
                                                    >
                                                        {item.title}
                                                    </CardTitle>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pt-0">
                                            <p
                                                className="leading-relaxed text-sm"
                                                style={{ color: '#FFD4A3' }}
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