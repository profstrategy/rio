import { ActivityType } from "@prisma/client";

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

export interface ActivityItem {
  id: string
  tweetId: string
  type: ActivityType
  text: string
  likes: number
  retweets: number
  replies: number
  quotes: number
  postedAt: string
}

export interface ActivityPage {
  success: boolean
  data: ActivityItem[]
  nextCursor: string | null
  mock?: boolean
}


export interface FetchParams {
  limit: number
  cursor?: string
  window?: string
}
