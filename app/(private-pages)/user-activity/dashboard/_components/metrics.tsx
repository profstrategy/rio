import { MetricsResponseData } from '@/app/api/user/dashboard-activity-metrics/types'
import MetricCard from '@/components/reusables/metric-card'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import React from 'react'
import { BsTwitterX } from 'react-icons/bs'

interface MetricsProps {
  data?: MetricsResponseData
}
const Metrics = (data:MetricsProps) => {
  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <MetricCard
          icon={BsTwitterX}
          label="Total Tweets"
          value={data.data?.totalTweets ?? 0}
          trend="+12.5%"
          delay={0.1}
        />
        <MetricCard
          icon={Repeat2}
          label="Total Retweets"
          value={data.data?.totalRetweets}
          trend="+18.3%"
          delay={0.2}
        />
        <MetricCard
          icon={Heart}
          label="Total Likes"
          value={data.data?.totalLikes}
          trend="+24.7%"
          delay={0.3}
        />
        <MetricCard
          icon={MessageCircle}
          label="Total Replies"
          value={data.data?.totalReplies}
          trend="+9.2%"
          delay={0.4}
        />
         {/* <MetricCard
          icon={QuoteIcon}
          label="Total Quotes"
          value={data.data?.totalQuotes}
          trend="+9.2%"
          delay={0.4}
        /> */}
      </div>

    </div>
  )
}

export default Metrics