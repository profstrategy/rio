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
  tweetId: string | null
  type: ActivityType
  text: string | null
  likes: number
  retweets: number
  replies: number
  quotes: number
  postedAt: Date | string
}

export interface PaginatedActivityResponse {
  success: boolean
  data: ActivityItem[]
  total: number
  offset: number
  limit: number
  mock?: boolean
}

export interface ActivityFilterParams {
  window?: ActivityWindow
  type?: ActivityType
  enabled?: boolean
}