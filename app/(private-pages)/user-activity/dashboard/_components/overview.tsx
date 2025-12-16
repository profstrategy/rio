'use client'
import { Card } from '@/components/ui/card'
import { AppHeading } from '@/components/reusables/app-heading'
import TotalTweets from './total-tweets'
import TotalRetweets from './total-retweets'
import TotalLikes from './total-likes'
import TotalComments from './total-comments'
import GraphCharts from './graph-charts'
import Comments from './comments'
import Tweets from './tweets'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import AppButton from '@/components/ui/app-button'

const Overview = () => {
    const session = useSession()
    return (
        <Card className='min-h-dvh container' style={{
            background: 'radial-gradient(ellipse at center right, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '2rem',
        }}>
            <div className=' rounded-lg flex flex-col justify-center bg-white'>
                <div className="dashboard">
                    <div className='grid grid-cols-[1fr_1fr] items-center gap-4'>
                        <div>
                            <AppHeading className=" text-2xl font-bold mb-4">Activity Dashboard</AppHeading>
                        </div>
                        <div className='flex gap-4 items-center justify-between w-full'>
                            <Image
                                src={`/${session.data?.user.image} ?? '/default-profile.png'`}
                                width={80}
                                height={80}
                                alt='twitter image'
                            />
                            <AppButton variant='primary' className=''>Signout</AppButton>
                        </div>
                    </div>
                    <div className="metrics grid grid-cols-1 grid-rows-3 gap-4">
                        <div className='grid grid-cols-4'>
                            <div className="bg-white p-4 rounded-lg shadow-md"><TotalTweets /></div>
                            <div className="bg-white p-4 rounded-lg shadow-md"><TotalRetweets /></div>
                            <div className="bg-white p-4 rounded-lg shadow-md"><TotalLikes /></div>
                            <div className="bg-white p-4 rounded-lg shadow-md"><TotalComments /></div>
                        </div>
                        <div className='grid grid-cols-12'>
                            <div className="bg-white p-4 rounded-lg shadow-md col-span-8"><GraphCharts /></div>
                            <div className="bg-white p-4 rounded-lg shadow-md col-span-4"><Comments /></div>
                        </div>

                        <div className='grid grid-cols-12'>
                            <div className="bg-white p-4 rounded-lg shadow-md col-span-8"><Tweets /></div>
                            <div className="bg-white p-4 rounded-lg shadow-md col-span-4"><TotalRetweets /></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Overview