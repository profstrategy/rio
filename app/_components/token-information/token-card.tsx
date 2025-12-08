import { TokenCardProps } from '@/constants/types'
import { p } from 'framer-motion/client'
import React from 'react'

const TokenCard = () => {
    const tokenCard = [
        {
            id: 1,
            title: 'LIQUIDITY',
            value: '50%',
            description: '(to protect price)'
        },
        {
            id: 4,
            title: 'PRESALE',
            value: '13%',
        },
        {
            id: 3,
            title: 'TEAM & ADVISORS',
            value: '10%',
            description: '(Locked for 14 months)'
        },
        {
            id: 6,
            title: 'MARKETING',
            value: '6%',
        },
        {
            id: 2,
            title: 'ECOSYSTEM AND REWARDS',
            value: '16%',
            description: '(Airdrop, staking rewards, & community reward)'
        },
        {
            id: 5,
            title: 'ECOSYSTEM DEVELOPMENT & PARTNERSHIPS',
            value: '5%',
        }
    ]
    const customstyle = {
        paddingInline: '1rem',
    }
    return (
        <div className="grid md:grid-cols-2 gap-3">
            {tokenCard.map((card: TokenCardProps) => (
                <div
                    key={card.id}
                    className="
                w-full rounded-xl relative
                bg-white/10 backdrop-blur-md
                border border-white/10
                shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                hover:bg-white/15 hover:shadow-[0_6px_25px_rgba(0,0,0,0.3)]
                transition-all duration-300
                group
            "
                    style={customstyle}
                >
                    {/* Glow Accent */}
                    <div className="
                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 
                bg-gradient-to-br from-cyan-400/40 to-transparent
                transition-opacity duration-300 pointer-events-none
            "/>

                    <div className="flex justify-between mb-1">
                        <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                            {card.value}
                        </p>

                        <p className="text-white/80 text-right text-base font-semibold leading-tight capitalize">
                            {card.title}
                        </p>
                    </div>

                    {card.description && (
                        <p className="text-white/50 text-sm mt-1">
                            {card.description}
                        </p>
                    )}
                </div>
            ))}
        </div>

    )
}

export default TokenCard