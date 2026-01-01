export interface Tweet {
  id: string;
  text: string;

  entities?: {
    hashtags?: {
      tag: string;
    }[], cashtags?: {
      tag: string
    }[];
  };

  referenced_tweets?: {
    id: string;
    type: 'retweeted' | 'quoted' | 'replied_to';
  }[];
}

export interface SearchResponse {
  data?: Tweet[];
  meta: {
    result_count: number;
    next_token?: string;
  };
  includes?: {
    tweets?: Tweet[];
  };
}

export type ActivityWindow = '24h' | '3d' | '7d';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface UserActivityDashboardResponse {
  success: boolean
  mock?: boolean
  data: {
    user: {
      username: string
      displayName: string
    }

    metrics: {
      totalTweets: number
      totalRetweets: number
      totalReplies: number
      totalQuotes: number
      totalLikes: number
      totalEngagement: number
    }

    count: number

    yappingScore: number

    activities: {
      items: DashboardActivity[]
      pageInfo: {
        nextCursor: string | null
        hasNextPage: boolean
      }
    }
  }
}


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


export interface MetricsResponseData {
  totalTweets: number,
  totalRetweets: number,
  totalReplies: number,
  totalQuotes: number,
  totalLikes: number,
  totalEngagements?: number
}

export enum ActivityType {
  tweet = 'TWEET',
  retweeted = 'RETWEET',
  replied_to = 'REPLY',
  quoted = 'QUOTE'
}

export interface ActivityResponseData {
  items: DashboardActivity[]
  pageInfo: {
    nextCursor: string | null
    hasNextPage: boolean
  }
}