import { Tweet } from "@/network/types";
import { apiRequest, IsRioRelated } from "../../helper";
import { getCachedData } from "@/lib/cache-helper";

// app/api/user/get-rio-tweets/route.ts
export async function getRioTweetsPaginated(
  userId: string,
  maxPages: number,
  maxResults: number,
  accessToken: string
): Promise<{ tweets: Tweet[]; count: number }> {
  const cacheKey = `twitter:tweets:${userId}`
  
  return getCachedData(cacheKey, async () => {
    let nextToken: string | undefined;
    let pages = 0;
    const rioTweets: Tweet[] = [];

    do {
      const params: Record<string, any> = {
        'tweet.fields': 'public_metrics,created_at,referenced_tweets,entities',
        max_results: maxResults,
      };

      if (nextToken) params.next_token = nextToken;

      const response = await apiRequest(`users/${userId}/tweets`, params, 'GET', accessToken);

      // Handle rate limit gracefully
      if (response.error === 'rate_limited') {
        console.warn('Tweets rate limited - returning partial data');
        break;
      }

      if (!response.data?.length) break;

      rioTweets.push(...response.data.filter(IsRioRelated));

      nextToken = response.meta?.next_token;
      pages++;

    } while (nextToken && pages < maxPages);

    return {
      tweets: rioTweets,
      count: rioTweets.length,
    };
  }, 300)
}