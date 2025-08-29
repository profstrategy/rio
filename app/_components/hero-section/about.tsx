import { AppHeading } from '@/components/reusables/app-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'

const About = () => {
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

    return (
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
         className="relative">

            <Card className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-0 backdrop-blur-lg " >
                <CardHeader className="" style={{
                    paddingBlock: '.5rem'
                }}>
                    <motion.div
                    variants={itemVariants} 
                    className="flex items-center justify-center gap-3 mb-4">
                        {/* <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-cyan-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
                                        🦜
                                    </div> */}
                        <div>
                            <CardTitle className="text-white text-xl" style={{
                                paddingInline: '.5rem'
                            }}>
                                <AppHeading
                                    variant='h3'
                                    className="bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent font-bold text-left"
                                >
                                    The Meme That Flew Over The Dogs
                                </AppHeading>
                            </CardTitle>
                        </div>
                    </motion.div>
                </CardHeader>

                <CardContent className='flex flex-col gap-2 ' style={{
                    paddingInline: '1rem'
                }}>
                    <p className="text-white/80 text-base leading-relaxed text-center ">
                        The meme meta is overcrowded with dogs. <span className="text-orange-400 font-semibold">$RIO</span> is not just another mutt in the pack, it's the <span className="text-cyan-400 font-semibold">rare bird</span> that flies above the noise.
                    </p>

                    <div className="bg-black/20 rounded-lg p-4 border border-orange-400/20">
                        <p className="text-sm text-white/70 italic text-center card-content">
                            "Inspired by Rio - a bird that escaped captivity and soared into a vibrant world of freedom."
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-2">
                        {/* <div className="flex items-center gap-2 text-orange-400">
                                        <span className="text-lg">🚀</span>
                                        <span className="text-sm font-semibold">Breaking Free</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-cyan-400">
                                        <span className="text-lg">🌟</span>
                                        <span className="text-sm font-semibold">Soaring High</span>
                                    </div> */}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default About