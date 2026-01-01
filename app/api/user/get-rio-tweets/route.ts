import { Tweet } from "@/network/types";
import { apiRequest, IsRioRelated } from "../../helper";
import { getCachedData } from "@/lib/cache-helper";

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
    const allTweets: Tweet[] = [];

    console.log(`📝 Fetching tweets for user ${userId}...`);

    do {
      const params: Record<string, any> = {
        // CRITICAL: Include entities to get hashtags and cashtags
        'tweet.fields': 'public_metrics,created_at,referenced_tweets,entities,author_id,conversation_id',
        'max_results': maxResults,
        // Don't exclude retweets/replies here - filter after
        'exclude': 'retweets' // Only exclude pure retweets, keep quotes
      };

      if (nextToken) params.next_token = nextToken;

      const response = await apiRequest(`users/${userId}/tweets`, params, 'GET', accessToken);

      // Handle rate limit gracefully
      if (response.error === 'rate_limited') {
        console.warn('⚠️ Tweets rate limited - returning partial data');
        break;
      }

      if (!response.data?.length) {
        console.log(`ℹ️ No more tweets found (page ${pages + 1})`);
        break;
      }

      console.log(`📄 Page ${pages + 1}: Fetched ${response.data.length} tweets`);
      
      // Store all tweets for debugging
      allTweets.push(...response.data);

      // Filter for RIO-related tweets
      const rioFiltered = response.data.filter((tweet: Tweet) => {
        const isRio = IsRioRelated(tweet);
        if (!isRio) {
          console.log(`⏭️ Skipped non-RIO tweet:`, {
            id: tweet.id,
            text: tweet.text?.substring(0, 80),
            entities: tweet.entities
          });
        }
        return isRio;
      });

      console.log(`✅ Found ${rioFiltered.length} RIO tweets in this page`);
      rioTweets.push(...rioFiltered);

      nextToken = response.meta?.next_token;
      pages++;

    } while (nextToken && pages < maxPages);

    console.log(`🎯 Final Results:`, {
      totalTweetsFetched: allTweets.length,
      rioTweetsFound: rioTweets.length,
      pages,
      sampleRioTweet: rioTweets[0] ? {
        id: rioTweets[0].id,
        text: rioTweets[0].text?.substring(0, 100),
        entities: rioTweets[0].entities
      } : 'none'
    });

    return {
      tweets: rioTweets,
      count: rioTweets.length,
    };
  }, 300)
}