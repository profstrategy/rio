'use client'
import { ActivityPaginatedContainer } from '@/app/(private-pages)/user-activity/dashboard/_components/activity-infinite-container'
import { Activity } from 'lucide-react'
import { DashboardCard } from '@/components/reusables/dashboard-card'
import { ReplyInfiniteContainer } from './reply-infinite-container'
import { useDashboardActivityUrlState, useDashboardRepliesUrlState, } from '@/hooks/use-dashboard-window-from-url'

const Contents = () => {
  const { window:activityWindow, setWindow:setActivityWindow } = useDashboardActivityUrlState()
const { window:repliesWindow, setWindow:setRepliesWindow } = useDashboardRepliesUrlState()
  // --- STYLES ---
  const styles = {
    // Glassmorphism Graph Container
    graphContainer: "h-64 sm:h-80 flex flex-col items-center justify-center rounded-[24px] bg-[#0f172a]/40 border border-[#00D2FF]/20 relative overflow-hidden group transition-all duration-300 hover:border-[#00D2FF]/40",
    graphPlaceholderText: "font-sync text-xs uppercase tracking-[0.2em] text-[#00D2FF]/60 mt-4",
    gridGap: "gap-6 sm:gap-8"
  }

  return (
    <div className={`flex flex-col ${styles.gridGap}`}>

      {/* --- Main Content Grid --- */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${styles.gridGap}`}>

        {/* Engagement Graph Section */}
        <div className="lg:col-span-8">
          <DashboardCard title="Engagement Overview" delay={0.5}>
            <div className={styles.graphContainer}>
              {/* Background Graph Grid Effect */}
              <div className="absolute inset-0"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0, 210, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 255, 0.03) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Central Icon */}
              <div className="p-4 rounded-full bg-[#00D2FF]/5 border border-[#00D2FF]/20 shadow-[0_0_30px_rgba(0,210,255,0.1)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Activity className="w-8 h-8 text-[#00D2FF]" />
              </div>

              <p className={styles.graphPlaceholderText}>
                Awaiting Data Stream
              </p>
            </div>
          </DashboardCard>
        </div>

        {/* Recent Comments Section */}
        <div className="lg:col-span-4">
          <DashboardCard
           title="Recent Comments" delay={0.6} activityWindow={repliesWindow} onActivityWindowChange={setRepliesWindow}>

            <ReplyInfiniteContainer
              type='REPLY'
            />
          </DashboardCard>
        </div>
      </div>

      {/* --- Bottom Grid --- */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${styles.gridGap}`}>

        {/* Recent Activity Full Width */}
        <div className="lg:col-span-full">
          <DashboardCard
            title={`Recent Activity (${activityWindow})`}
            delay={0.7}
            activityWindow={activityWindow}
            onActivityWindowChange={setActivityWindow}
          >
            <ActivityPaginatedContainer />
          </DashboardCard>
        </div>

      </div>
    </div>
  )
}

export default Contents