import { ActivityResponseData } from '@/app/api/user/dashboard-activity-metrics/types'
import DashboardCard from '@/components/reusables/dashboard-card'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

interface ContentsProps {
  data?: ActivityResponseData
}

const Contents = (data: ContentsProps) => {
  const { data: user } = useSession()
  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8">
          <DashboardCard title="Engagement Overview" delay={0.5}>
            <div className="h-64 sm:h-80 flex items-center justify-center rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                border: '2px dashed rgba(56, 189, 248, 0.3)'
              }}>
              <p className="text-sm font-medium" style={{ color: '#64748b' }}>
                Graph Chart Placeholder
              </p>
            </div>
          </DashboardCard>
        </div>

        <div className="lg:col-span-4">
          <DashboardCard title="Recent Comments" delay={0.6}>
            <div className="space-y-3 h-64 sm:h-80 overflow-auto pr-2">
              {data.data?.items.map((item, i) => (
                <div key={i} className="p-4 rounded-xl transition-all hover:scale-102"
                  style={{
                    background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.2)'
                  }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full shrink-0"
                      style={{ background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)' }}>
                      <Image
                        src={user?.user.image ?? ''}
                        width={50}
                        height={50}
                        alt='twitter image'
                        className='rounded-full'
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold mb-1" style={{ color: '#0284c7' }}>
                        @{user?.user.username}
                      </p>
                      {item.type === 'REPLY' ?
                        <p className="text-xs" style={{ color: '#64748b' }}>
                          {item.text}
                        </p>
                      : 'No comments from you yet'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-full">
          <DashboardCard title="Recent Tweets (48hrs)" delay={0.7}>
            <div className="space-y-3 h-64 overflow-auto pr-2">
              {data.data?.items.map((item, i) => (
                <div key={i} className="p-4 rounded-xl transition-all hover:scale-102"
                  style={{
                    background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.2)'
                  }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full shrink-0"
                      style={{ background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)' }} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1" style={{ color: '#0284c7' }}>
                        {/* @user{item} */}
                      </p>
                      <p className="text-sm mb-2" style={{ color: '#475569' }}>
                        Tweet content about $RIO goes here...
                      </p>
                      <div className="flex gap-4 text-xs" style={{ color: '#94a3b8' }}>
                        <span>❤️ 124</span>
                        <span>🔄 45</span>
                        <span>💬 12</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* <div className="lg:col-span-4">
          <DashboardCard title="Top Retweeters" delay={0.8}>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-102"
                  style={{
                    background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.2)'
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)' }}>
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#0284c7' }}>
                      @user{item}
                    </span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#00B4DB' }}>
                    {Math.floor(Math.random() * 500) + 100}
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div> */}
      </div>
    </div>
  )
}

export default Contents