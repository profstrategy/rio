import React from 'react'

const TokenCard = () => {
    interface TokenCardProps {
        id: number;
        title: string;
        value: string;
        description?: string;
    }
    const tokenCard = [
        {
            id: 1,
            title: 'LIQUIDITY',
            value: '50%',
            description: '(to protect price)'
        },
         {
            id: 2,
            title: 'Ecosystem and Reward',
            value: '16%',
            description: '(Airdrop, staking rewards, & community reward)'
        },
         {
            id: 3,
            title: 'Team and Adivisors',
            value: '10%',
            description: '(Locked for 14 months)'
        },
         {
            id: 4,
            title: 'Presale',
            value: '13%',
        },
         {
            id: 5,
            title: 'Ecosystem Development & Partnerships',
            value: '5%',
        },
         {
            id: 6,
            title: 'Marketing',
            value: '6%',
        }
    ]
  return (
    <div className='grid grid-cols-2 gap-2 '>
        {tokenCard.map((card) => (
            <div key={card.id} className='bg-rio-sky-200/30 rounded-lg border-2 border-dashed border-rio-sky-500/30 w-full'>
                <div className='flex justify-between mb-2'>
                    <p className='text-xl font-bold text-fire-sky-500'>{card.value}</p>
                    <p className='text-white/70 text-lg capitalize'>{card.title}</p>
                </div>
                <p className='text-white/50'>{card.description}</p>
            </div>
        ))}
    </div>
  )
}

export default TokenCard