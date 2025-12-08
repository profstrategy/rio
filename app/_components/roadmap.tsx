import { AppHeading } from '@/components/reusables/app-heading'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import React from 'react'

const RoadMap = () => {
    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    const roadmap = [
        {
            id: 1,
            title: 'PHASE 1',
            heading: 'Foundation & Community Seeding (Month 1–2)',
            details: [
                'Brand identity + mission statement',
                'Social channels launch (Telegram, X, Discord)',
                'Community onboarding campaign',
                'Release lite paper (vision + mission + utility explained)',
                'Launch website v1 (landing page + overview)'
            ]
        },
        {
            id: 2,
            title: 'PHASE 2 (Community Reward)',
            heading: 'Commencement of SOCIAL-FI META (Yapping Era Begins – 2 months)',
            details: [
                'Public Sale (Presale / IDO)',
                'Token Generation Event (TGE) and DEX listing',
                'Distribution of SocialFi campaign rewards',
                'Activation of liquidity pool'
            ]
        },
        {
            id: 3,
            title: 'PHASE 3',
            heading: 'The Flight',
            details: [
                'Community-led CEX listing campaigns',
                'Expansion of $RIO InfoFi model with new campaigns',
                'Establishment of “Bonk Jungle” ecosystem with partnerships and integrations'
            ]
        },
        {
            id: 4,
            title: 'PHASE 4',
            heading: 'The Carnival',
            details: [
                'Development of bird-themed burn / rebirth mechanics',
                'Exploration of NFTs and collaborations',
                'Continued cultural and creative expansion'
            ]
        }
    ]

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full space-y-10"
        >
            <AppHeading
                variant="h2"
                className="text-3xl font-bold text-transparent bg-gradient-to-r from-white/80 to-white/40 bg-clip-text tracking-wide"
            >
                ROADMAP
            </AppHeading>

            <div className="grid md:grid-cols-2 gap-4 ">
                {roadmap.map((phase, _) => (
                    <motion.div
                        key={phase.id}
                        variants={itemVariants}
                        className="
                             rounded-xl relative
                            bg-white/5 border border-white/10
                            backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.4)]
                            hover:bg-white/10
                            transition-all duration-300
                        "
                        style={{ padding: '1rem', marginTop: '1rem' }}
                    >
                        {/* TITLE */}
                        <p className="text-cyan-300 font-bold tracking-widest text-sm " style={{ marginBottom: '.5rem' }}>
                            {phase.title}
                        </p>

                        {/* HEADING */}
                        <h3 className="text-lg md:text-xl font-semibold text-white/90">
                            {phase.heading}
                        </h3>

                        {/* DETAILS LIST */}
                        <ul className="space-y-2">
                            {phase.details.map((detail: any, i: number) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-white/70"
                                >
                                    <Play 
                                        className="w-4 h-4 text-cyan-300" 
                                        strokeWidth={2}
                                    />

                                    <span className="leading-relaxed">{detail}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CYAN GLOW ON HOVER */}
                        <div className="
                            absolute inset-0 opacity-0 hover:opacity-10
                            bg-gradient-to-br from-cyan-400/30 to-transparent
                            rounded-xl transition-opacity duration-300
                        " />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default RoadMap
