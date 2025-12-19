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
