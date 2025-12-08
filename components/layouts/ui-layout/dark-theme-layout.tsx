'use client'
import React from 'react'
import { motion } from 'framer-motion'
import HowItWorks from '@/app/_components/how-it-works';
import RoadMap from '@/app/_components/roadmap';

const DarkThemeLayout = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className='relative flex flex-col gap-4 items-center justify-center bg-black border-0 backdrop-blur-lg container'
            style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
        >
            <HowItWorks />
            <RoadMap />
        </motion.div>
    )
}

export default DarkThemeLayout