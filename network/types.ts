export interface Tweet {
  id: string;
  text: string;

  entities?: {
    hashtags?: {
      tag: string;
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
  success: boolean,
  data: {
    user: {
      username: string,
      displayName: string
    },
    metrics: {
      totalTweets: number,
      totalRetweets: number,
      totalReplies: number,
      totalQuotes: number,
      totalLikes: number,
      totalEngagement?: () => void,
    },
    yappingScore: number
    activities: {
      tweets: string,
      retweets: string,
      replies: string,
      quotes: string,
      likes: string
    },
    searchData: {
      searchResults: Tweet[],
      count: number
    }
  }
}

export interface MetricsResponseData {
  totalTweets: number,
  totalRetweets: number,
  totalReplies: number,
  totalQuotes: number,
  totalLikes: number,
}