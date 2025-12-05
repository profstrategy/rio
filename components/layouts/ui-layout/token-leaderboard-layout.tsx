'use client'
import React from 'react'
import dynamic from 'next/dynamic';

const AppBackground = dynamic(() => import('@/components/layouts/ui-layout/app-background'), { ssr: false });
const LeaderBoard = dynamic(() => import('@/app/_components/leaderboard/leaderboard'), { ssr: false })
const TokenInfo = dynamic(() => import('@/app/_components/token-information/token-info'), { ssr: false })
const SocialLinks = dynamic(() => import('@/app/_components/social-links'), { ssr: false })

const TokenLeaderBoardLayout = () => {
    return (
        <section className=''>
            <AppBackground>
                <div className='' >
                    <LeaderBoard />
                    <div className=''>
                        <TokenInfo />
                        <SocialLinks />
                    </div>
                </div>
            </AppBackground>

            <style jsx>{
                `
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