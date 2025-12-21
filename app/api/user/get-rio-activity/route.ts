import { NextResponse } from "next/server"
import { apiRequest } from "../../helper"
import { ActivityWindow, SearchResponse, Tweet } from "@/network/types";
import { getStartTime } from "@/_lib/utils";

export async function searchRioUserActivityPaginated(
  username: string,
  window: ActivityWindow,
  maxPages: 10
): Promise<{ searchResults: Tweet[]; count: number }> {

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
      '/searchResults/search/recent',
      params
    )

    if (response?.data?.length) {
      allTweets.push(...response?.data)
    }
    newToken = response.meta?.next_token
    page++
  } while (newToken && page < maxPages)
  return {
    searchResults: allTweets,
    count: allTweets.length,
  };
}
