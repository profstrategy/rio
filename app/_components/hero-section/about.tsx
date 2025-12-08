import { AppHeading } from '@/components/reusables/app-heading'
import React from 'react'

const About = () => {

    return (
        <>
            <AppHeading
                variant='h1'
                className="text-white drop-shadow-lg bg-clip-text font-bold text-left "
            >
                The Meme That Flew Over The Dogs
            </AppHeading>
            <p className="text-white text-xl leading-relaxed text-left ">
                The meme meta is overcrowded with dogs. $RIO is not just another mutt in the pack, it's the rare bird that flies above the noise.
            </p>
        </>
    )
}

export default About

//  <motion.div
//           variants={itemVariants}
//           className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-orange-200 bg-clip-text text-transparent animate-pulse">
//           $RIO
//         </motion.div>