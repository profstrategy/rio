import { Tweet } from "@/network/types";

const base_url = process.env.BASE_URL;
const keywords = ['$rio', '$rioonbonk', '#rio', '#rioonbonk'];


export function IsRioRelated(tweet: Tweet): boolean {
  const text = tweet.text?.toLowerCase() ?? '';

  const hasKeyword = keywords.some(keyword =>
    text.includes(keyword.toLowerCase())
  );

  const hasHashTag =
    Array.isArray(tweet.entities?.hashtags) &&
    tweet.entities.hashtags.some(h =>
      ['rio', 'rioonbonk'].includes(h.tag.toLowerCase())
    );

  return hasKeyword || hasHashTag;
}

// app/api/helper.ts
export async function apiRequest(
  endpoint: string, 
  params: Record<string, any> = {}, 
  method: string = 'GET', 
  accessToken: string
): Promise<any> {
  const queryString = new URLSearchParams(params).toString();
  const url = `${base_url}/${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
      credentials: 'include'
    });

    // ✅ Handle rate limiting FIRST (before other checks)
    if (response.status === 429) {
      console.warn(`⚠️ Rate limited on /${endpoint}`);
      return { 
        data: null, 
        error: 'rate_limited',
        message: 'Twitter API rate limit reached'
      };
    }

    // ✅ Handle other errors
    if (!response.ok) {
      // Try to parse error, but handle cases where body is empty/invalid
      let errorDetails = `HTTP ${response.status}`;
      try {
        const errorBody = await response.json();
        errorDetails = JSON.stringify(errorBody);
      } catch (parseError) {
        // If JSON parsing fails, use status text
        errorDetails = response.statusText || errorDetails;
      }
      
      throw new Error(`Twitter API Error: ${response.status} - ${errorDetails}`);
    }

    // ✅ Parse successful response
    return await response.json();
    
  } catch (error: any) {
    // Handle timeout
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      console.error(`⏱️ Timeout on /${endpoint}`);
      return { 
        data: null, 
        error: 'timeout',
        message: 'Request timed out'
      };
    }
    
    // Re-throw other errors
    throw error;
  }
}