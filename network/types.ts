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