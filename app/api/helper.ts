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

export async function apiRequest(endpoint: string, params: Record<string, any> = {}, method: string = 'GET', accessToken: string): Promise<any> {
    const queryString = new URLSearchParams(params).toString();
    const url = `${base_url}/${endpoint}?${queryString}`;

    const response = await fetch(url, {
        method: method,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Twitter API Error: ${response.status} - ${JSON.stringify(error)}`)
    }

    return response.json();
}
