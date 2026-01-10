
export interface DashboardActivity {
  id: string
  tweetId: string
  type: 'TWEET' | 'RETWEET' | 'REPLY' | 'QUOTE'
  text: string
  likes: number
  retweets: number
  replies: number
  quotes: number
  postedAt: string
}

export interface ActivityResponseData {
  items: DashboardActivity[]
  pageInfo: {
    nextCursor: string | null
    hasNextPage: boolean
  }
}

export interface RioActivityMetricsResponse {
  success: true
  data: {
    metrics: {
      totalTweets: number
      totalRetweets: number
      totalReplies: number
      totalQuotes: number
      totalLikes: number
      totalEngagement: number
    }
    yappingScore: number
  }
}

export interface MetricsResponseData {
  totalTweets: number,
  totalRetweets: number,
  totalReplies: number,
  totalQuotes: number,
  totalLikes: number,
  totalEngagements?: number
}