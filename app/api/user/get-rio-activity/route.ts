import { getCachedData } from "@/lib/cache-helper";
import { apiRequest } from "../../helper";
import { Tweet } from "@/network/types";

export async function searchRioActivityMetrics(
  username: string,
  accessToken: string
): Promise<{ searchResults: Tweet[] }> {
  const cacheKey = `twitter:search:${username}:metrics`

  return getCachedData(cacheKey, async () => {
    console.log(`🔍 Searching tweets from:${username} with RIO keywords since`);

    const params: Record<string, any> = {
      query: `from:${username} (RIO OR RioOnBonk OR $RIO OR $RioOnBonk)`,
      'tweet.fields': 'public_metrics,created_at,entities,referenced_tweets,author_id,conversation_id',
      max_results: 100,
    };

    const response = await apiRequest(
      'tweets/search/recent',
      params,
      'GET',
      accessToken
    )

    // Handle rate limit
    if (response.error === 'rate_limited') {
      console.warn('⚠️ Search rate limited - returning partial data')
    }

    if (!response?.data?.length) {
      console.log(`ℹ️ No actvity found`);
    }

    return response.data ?? []

  }, 180)
}