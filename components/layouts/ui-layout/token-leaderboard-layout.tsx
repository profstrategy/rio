'use client'
import React from 'react'
import dynamic from 'next/dynamic';

const AppBackground = dynamic(() => import('@/components/layouts/ui-layout/app-background'), { ssr: false });
const LeaderBoard = dynamic(() => import('@/app/_components/leaderboard/leaderboard'), { ssr: false })
const TokenInfo = dynamic(() => import('@/app/_components/token-information/token-info'), { ssr: false })
const SocialLinks = dynamic(() => import('@/app/_components/social-links'), { ssr: false })

const TokenLeaderBoardLayout = () => {
    return (
        <section className='relative'>
            <AppBackground>
                <div className='grid md:grid-cols-6 grid-cols-1 w-full gap-8 token-background token-padding' >
                    <LeaderBoard />
                    <div className='col-span-3 '>
                        <TokenInfo />
                        <SocialLinks />
                    </div>
                </div>
            </AppBackground>

            <style jsx>{
                `.token-padding{
                padding: 20rem 0 0 0
                }

                @media(max-width: 1024px){
                .token-padding {
                    padding: 28rem 0 0 0
                }
                }

                @media(max-width: 920px){
                .token-padding {
                    padding: 28rem 0 0 0
                }
                }
                
                @media(max-width: 768px){
                .token-padding {
                    padding: 20rem 0 0 0
                }
                }

                @media(max-width: 560px){
                .token-padding {
                    padding: 24rem 0 0 0
                }
                }

                @media(max-width: 350px){
                .token-padding {
                    padding: 28rem 0 0 0
                }
                }
                `
            }

            </style>
        </section>
    )
}

export default TokenLeaderBoardLayout