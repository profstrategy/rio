import { getCachedData } from "@/lib/cache-helper";
import { apiRequest } from "../../helper";

export async function getUserLikes(userId: string, maxResults: number, accessToken: string) {
  const cacheKey = `twitter:likes:${userId}` 
  
  return getCachedData(
    cacheKey,
    async () => {
      try {
        const params = {
          'tweet.fields': 'author_id,public_metrics,created_at',
          'max_results': maxResults,
        }

        const result = await apiRequest(`users/${userId}/liked_tweets`, params, 'GET', accessToken);

        if (result.error === 'rate_limited') {
          console.warn('User likes rate limited - returning empty array');
          return [];
        }

        return result.data || []
      } catch (error) {
        console.error("Error fetching user likes:", error);
        return []
      }
    }, 
    600
  )
}