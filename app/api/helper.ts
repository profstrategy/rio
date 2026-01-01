import { Tweet } from "@/network/types";

const base_url = process.env.BASE_URL;
const keywords = ['$rio', '$rioonbonk', '#rio', '#rioonbonk'];

export function IsRioRelated(tweet: Tweet): boolean {
  if (!tweet || !tweet.text) {
    console.log('❌ Invalid tweet object:', JSON.stringify(tweet).substring(0, 200));
    return false;
  }

  const text = tweet.text.toLowerCase();
  
  // Check text content for keywords
  const hasKeyword = keywords.some(keyword =>
    text.includes(keyword.toLowerCase())
  );

  // Check hashtags entities
  const hasHashTag = tweet.entities?.hashtags?.some(h =>
    ['rio', 'rioonbonk'].includes(h.tag?.toLowerCase())
  ) ?? false;

  // Check cashtags ($RIO, $RIOONBONK)
  const hasCashtag = tweet.entities?.cashtags?.some((c: any) =>
    ['rio', 'rioonbonk'].includes(c.tag?.toLowerCase())
  ) ?? false;

  const isRelated = hasKeyword || hasHashTag || hasCashtag;
  
  // Debug logging
  if (isRelated) {
    console.log('✅ RIO tweet found:', {
      id: tweet.id,
      text: tweet.text.substring(0, 100),
      hasKeyword,
      hasHashTag,
      hasCashtag,
      entities: tweet.entities
    });
  }

  return isRelated;
}

export async function apiRequest(
  endpoint: string, 
  params: Record<string, any> = {}, 
  method: string = 'GET', 
  accessToken: string
): Promise<any> {
  // Validate BASE_URL
  if (!base_url) {
    console.error('❌ BASE_URL is not configured!');
    throw new Error('BASE_URL environment variable is required');
  }

  const queryString = new URLSearchParams(params).toString();
  const url = `${base_url}/${endpoint}${queryString ? `?${queryString}` : ''}`;

  console.log(`🔍 API Request: ${method} ${url}`);

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

    console.log(`📡 Response Status: ${response.status} for ${endpoint}`);

    // Handle rate limiting
    if (response.status === 429) {
      console.warn(`⚠️ Rate limited on /${endpoint}`);
      const rateLimitReset = response.headers.get('x-rate-limit-reset');
      console.log(`Rate limit resets at: ${rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : 'unknown'}`);
      return { 
        data: null, 
        error: 'rate_limited',
        message: 'Twitter API rate limit reached'
      };
    }

    // Handle errors
    if (!response.ok) {
      let errorDetails = `HTTP ${response.status}`;
      try {
        const errorBody = await response.json();
        console.error(`❌ API Error Response:`, errorBody);
        errorDetails = JSON.stringify(errorBody);
      } catch (parseError) {
        errorDetails = response.statusText || errorDetails;
      }
      
      throw new Error(`Twitter API Error: ${response.status} - ${errorDetails}`);
    }

    // Parse successful response
    const data = await response.json();
    
    // Debug logging for successful responses
    console.log(`✅ API Success for ${endpoint}:`, {
      dataCount: data.data?.length || 0,
      metaKeys: data.meta ? Object.keys(data.meta) : [],
      includesKeys: data.includes ? Object.keys(data.includes) : [],
      firstItem: data.data?.[0] ? {
        id: data.data[0].id,
        text: data.data[0].text?.substring(0, 50),
        hasEntities: !!data.data[0].entities,
        entities: data.data[0].entities
      } : 'none'
    });

    return data;
    
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
    
    console.error(`❌ API Request Failed:`, error);
    throw error;
  }
}