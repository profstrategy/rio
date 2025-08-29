'use client'
import React from 'react'
import { AppHeading } from '../reusables/app-heading'
import Image from 'next/image'
import { logo } from '@/public'

const MainHeader = () => {
  return (
    <section
      style={{ background: 'radial-gradient(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)' }}
      className='min-h-screen relative overflow-hidden'
    >
      <div className="h-full container">
        <div className="flex md:flex-row justify-between items-center gap-8 lg:gap-16 min-h-screen flex-col-reverse">
          {/* Content Column */}
          <div className="flex flex-col justify-center gap-8">
            {/* Main Heading */}
            <div className="max-w-10rem md:w-3/5 w-4/5">
              <AppHeading variant='h1' className='text-white-rio '>The meme that flew over the dogs</AppHeading>
            </div>

            {/* Description Text */}
            <div className=" w-4/5">
              <AppHeading variant='h4' className='text-white-rio opacity-95'> The meme meta is overcrowded with dogs.$ROI's not just another mutt in the pack, it's the rare bird that flies above the noise.</AppHeading>
            </div>
            {/* <div className="space-y-6 max-w-xl">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium">
                The meme meta is overcrowded with dogs.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium">
                $ROI's not just another mutt in the pack, it's the rare bird that flies above the noise.
              </p>
            </div>
             */}
            {/* CTA Button */}
            <div className="pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-green-400 to-red-500 hover:from-teal-500 hover:via-teal-600 hover:to-teal-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg max-w-[10rem] w-4/5 h-12">
                Join Community
              </button>
            </div>
          </div>

          {/* Image Column - Empty for now */}
          <div className=" lg:flex items-center justify-center relative">

            <Image src={logo} width={500} height={500} quality={100} alt='header-image' priority={false} />

          </div>
        </div>
      </div>

    </section>
  )
}

export default MainHeader