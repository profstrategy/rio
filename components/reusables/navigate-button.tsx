import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import React from 'react'

const NavigateButton = () => {
    const router = useRouter()
  return (
       <motion.button
                onClick={() => router.push(`/`)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-0 left-4 w-12 h-12 rounded-full border-2 border-primary-600 flex items-center justify-center bg-white shadow-md cursor-pointer"
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </motion.button>
  )
}

export default NavigateButton