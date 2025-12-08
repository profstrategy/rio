'use client'
import AppButton from '@/components/ui/app-button'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import { globalRoutes } from '@/constants/routes';
import Image from 'next/image';
import About from './about';

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

const HeroContent = () => {
  const router = useRouter()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants} className="z-10 grid md:grid-cols-2 text-center relative md:min-h-[32rem] min-h-[30rem] container"
    >
      <motion.div variants={itemVariants} className='flex flex-col items-start justify-center gap-8'>
          <About />
        <AppButton className='md:w-80 w-60 rounded-xl border-b-2' onClick={() => router.push(globalRoutes.externalPage.telegram)}><h3 className='text-2xl font-bold'>JOIN COMMUNITY</h3></AppButton>
      </motion.div>
    <div className="relative w-full h-full md:flex items-center justify-end hidden">
  <Image
    alt="hero-image"
    src={'/rio-logo.png'}
    fill
    className="object-contain max-w-full"
    quality={100}
  />
</div>
    </motion.div>

  )
}

export default HeroContent