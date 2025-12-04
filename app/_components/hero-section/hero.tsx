'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const HeroEffect = dynamic(() => import('@/app/_components/hero-section/hero-effect'), { ssr: false })
const HeroContent = dynamic(() => import('@/app/_components/hero-section/hero-content'), { ssr: false })

const MainHeader = () => {
  return (
    <section id='home'>
      <HeroEffect>
        <HeroContent />
      </HeroEffect>
    </section>
  )
}

export default MainHeader