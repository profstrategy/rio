import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import React from 'react'

const NavigateButton = () => {
    const router = useRouter()
    return (
        <motion.button
            onClick={() => router.push(`/`)}
            initial={{ opacity: 0, x: -20 }} // Added subtle slide-in
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            // RIO STYLING:
            // 1. Fixed Position with Z-Index 50 (to stay on top of glass cards)
            // 2. Dark Glass Background (bg-[#0f172a]/80 + backdrop-blur)
            // 3. Neon Blue Border/Glow on Hover
            className="fixed top-6 left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 text-gray-400 shadow-[0_4px_30px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:text-white hover:border-[#00D2FF] hover:bg-[#00D2FF]/10 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
            aria-label="Go back"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </motion.button>
    )
}

export default NavigateButton