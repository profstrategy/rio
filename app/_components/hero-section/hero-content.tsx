'use client'
import AppButton from '@/components/ui/app-button'
import React from 'react'
import  { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants:any = {
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

const HeroContent = () => {
  const router = useRouter()
    return (
         <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}className="relative z-10 flex flex-col items-center justify-start md:gap-9 gap-10 min-h-[30rem] text-center h-auto "
       >
            
            <motion.div
            variants={itemVariants}
             className="text-9xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                $RIO
            </motion.div>
            <AppButton className='md:w-80 w-60' onClick={() => router.push('https://x.com/rioonbonk')}><h3 className='text-2xl font-bold'>JOIN COMMUNITY</h3></AppButton>
        </motion.div>
    )
}

export default HeroContent