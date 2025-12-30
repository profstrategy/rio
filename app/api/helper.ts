import { Tweet } from "@/network/types";
import { getSession } from "next-auth/react";

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
      signal: AbortSignal.timeout(15000), // 15 second timeout
      credentials: 'include'
    });

    // ✅ Handle rate limiting gracefully - don't throw, return empty
    if (response.status === 429) {
      console.warn(`⚠️ Rate limited on ${endpoint} - returning empty data`);
      
      // Return empty data structure instead of throwing
      return { 
        data: null, 
        error: 'rate_limited',
        message: 'Twitter API rate limit reached'
      };
    }

    // Handle other errors
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Twitter API Error: ${response.status} - ${JSON.stringify(error)}`);
    }

    return response.json();
    
  } catch (error: any) {
    // Handle timeout
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      console.error(`⏱️ Timeout on ${endpoint}`);
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