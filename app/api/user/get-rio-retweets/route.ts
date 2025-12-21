import { Tweet } from "@/network/types";
import { apiRequest, IsRioRelated } from "../../helper";

export async function getRioRetweetsPaginated(
  userId: string,
  maxPages = 10,
  maxResults = 100
): Promise<{ retweets: Tweet[]; count: number }> {

  let nextToken: string | undefined;
  let pages = 0;
  const allRetweets: Tweet[] = [];

  do {
    const params: Record<string, any> = {
      'tweet.fields': 'public_metrics,created_at,referenced_tweets,entities',
      expansions: 'referenced_tweets.id',
      max_results: maxResults,
    };

    if (nextToken) params.next_token = nextToken;

    const response = await apiRequest(`/users/${userId}/tweets`, params);

    if (!response.data?.length) break;

    const retweets = response.data.filter((tweet: Tweet) => {
      const retweetRef = tweet.referenced_tweets?.find(
        ref => ref.type === 'retweeted'
      );

      if (!retweetRef) return false;

      const originalTweet = response.includes?.tweets?.find(
        (t: Tweet) => t.id === retweetRef.id
      );

      if (!originalTweet) return false;

      return IsRioRelated(originalTweet);
    });

    allRetweets.push(...retweets);

    nextToken = response.meta?.next_token;
    pages++;

  } while (nextToken && pages < maxPages);

  return {
    retweets: allRetweets,
    count: allRetweets.length,
  };
}
