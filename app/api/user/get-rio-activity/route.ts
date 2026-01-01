import { getStartTime } from "@/_lib/utils";
import { getCachedData } from "@/lib/cache-helper";
import { ActivityWindow, Tweet } from "@/network/types";
import { apiRequest } from "../../helper";

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

    console.log(`🔍 Searching tweets from:${username} with RIO keywords since ${startTime}`);

    do {
      const params: Record<string, any> = {
        // Fix search query - Twitter search doesn't need # in hashtag search
        // Also add OR logic for cashtags
        query: `from:${username} (RIO OR RioOnBonk OR $RIO OR $RioOnBonk)`,
        start_time: startTime,
        // CRITICAL: Must include entities for hashtags/cashtags
        'tweet.fields': 'public_metrics,created_at,entities,referenced_tweets,author_id,conversation_id',
        max_results: 100,
      };

      if (newToken) {
        params.next_token = newToken
      }

      console.log(`🔍 Search query: ${params.query}`);

      const response = await apiRequest(
        'tweets/search/recent',
        params,
        'GET',
        accessToken
      )

      // Handle rate limit
      if (response.error === 'rate_limited') {
        console.warn('⚠️ Search rate limited - returning partial data');
        break;
      }

      if (response?.data?.length) {
        console.log(`📄 Search page ${page + 1}: Found ${response.data.length} tweets`);
        allTweets.push(...response.data)
        
        // Log first tweet for debugging
        if (page === 0 && response.data[0]) {
          console.log(`📝 Sample search result:`, {
            id: response.data[0].id,
            text: response.data[0].text?.substring(0, 100),
            entities: response.data[0].entities,
            created_at: response.data[0].created_at
          });
        }
      } else {
        console.log(`ℹ️ No search results on page ${page + 1}`);
      }
      
      newToken = response.meta?.next_token
      page++
    } while (newToken && page < maxPages)
    
    console.log(`🎯 Search complete: Found ${allTweets.length} total tweets`);

    return {
      searchResults: allTweets,
      count: allTweets.length,
    };
  }, 180)
}