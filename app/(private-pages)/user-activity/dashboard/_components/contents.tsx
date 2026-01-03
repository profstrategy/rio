import { ActivityResponseData } from '@/app/api/user/dashboard-activity-metrics/types'
import { ActivityPaginatedContainer } from '@/components/reusables/activity-infinite-container'
import DashboardCard from '@/components/reusables/dashboard-card'
import { useSession } from 'next-auth/react'
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
          <DashboardCard title="Recent Comments" delay={0.6} activityWindow={'24h'}>
            <ActivityPaginatedContainer
              window="24h"
              type='REPLY'
            />
          </DashboardCard>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-full">
          <DashboardCard title="Recent Activity (24hrs)" delay={0.7} activityWindow='24h'>
             <ActivityPaginatedContainer
              window="24h"
            />
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