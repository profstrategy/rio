import { Tweet } from "@/network/types";
import { apiRequest, IsRioRelated } from "../../helper";
import { getCachedData } from "@/lib/cache-helper";

export async function getRioRetweetsPaginated(
  userId: string,
  maxPages: number,
  maxResults: number,
  accessToken: string
): Promise<{ retweets: Tweet[]; count: number }> {
  const cacheKey = `twitter:retweets:${userId}`
  
  return getCachedData(cacheKey, async () => {
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

      const response = await apiRequest(`users/${userId}/tweets`, params, 'GET', accessToken);

      // Handle rate limit
      if (response.error === 'rate_limited') {
        console.warn('Retweets rate limited - returning partial data');
        break;
      }

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
  }, 300)
}