import MetricCard from '@/components/reusables/metric-card'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import React from 'react'
import { BsTwitterX } from 'react-icons/bs'

interface MetricsResponseData {
  totalTweets: number,
  totalRetweets: number,
  totalReplies: number,
  totalQuotes: number,
  totalLikes: number,
}
const Metrics = (data:MetricsResponseData) => {
  const { totalTweets, totalRetweets, totalReplies, totalLikes, totalQuotes } = data
  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <MetricCard
          icon={BsTwitterX}
          label="Total Tweets"
          value={totalTweets}
          trend="+12.5%"
          delay={0.1}
        />
        <MetricCard
          icon={Repeat2}
          label="Total Retweets"
          value={totalRetweets}
          trend="+18.3%"
          delay={0.2}
        />
        <MetricCard
          icon={Heart}
          label="Total Likes"
          value={totalLikes}
          trend="+24.7%"
          delay={0.3}
        />
        <MetricCard
          icon={MessageCircle}
          label="Total Replies"
          value={totalReplies}
          trend="+9.2%"
          delay={0.4}
        />
      </div>

    </div>
  )
}

export default Metrics