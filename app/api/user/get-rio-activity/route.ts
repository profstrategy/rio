import { getStartTime } from "@/_lib/utils";
import { getCachedData } from "@/lib/cache-helper";
import { ActivityWindow, Tweet } from "@/network/types";
import { apiRequest } from "../../helper";

// app/api/user/get-rio-activity/route.ts
export async function searchRioUserActivityPaginated(
  username: string,
  window: ActivityWindow,
  maxPages: number,
  accessToken: string
): Promise<{ searchResults: Tweet[]; count: number }> {
  const cacheKey = `twitter:search:${username}:${window}`
  
  return getCachedData(cacheKey, async () => {
    const startTime = getStartTime(window);
    const allTweets: Tweet[] = [];
    let newToken: string | undefined
    let page: number = 0

    do {
      const params: Record<string, any> = {
        query: `from:${username} ($RIO OR $RioOnBonk OR #RIO OR #RioOnBonk)`,
        start_time: startTime,
        'tweet.fields': 'public_metrics,created_at,entities,referenced_tweets',
        max_results: 100,
      };

      if (newToken) {
        params.next_token = newToken
      }

      const response = await apiRequest(
        'tweets/search/recent',
        params,
        'GET',
        accessToken
      )

      // Handle rate limit
      if (response.error === 'rate_limited') {
        console.warn('Search rate limited - returning partial data');
        break;
      }

      if (response?.data?.length) {
        allTweets.push(...response.data)
      }
      
      newToken = response.meta?.next_token
      page++
    } while (newToken && page < maxPages)
    
    return {
      searchResults: allTweets,
      count: allTweets.length,
    };
  }, 180) // 3 minutes cache (search changes frequently)
}