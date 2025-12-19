import { Tweet } from "@/network/types";
import { apiRequest, IsRioRelated } from "../../helper";

export async function getUserTweets(userId: string, maxResults: number = 100): Promise<Tweet> {
    try {
        const params = {
            max_results: maxResults,
            "tweet.fields": "public_metrics,created_at,entities,referenced_tweets",
            "user.fields": "name,username"
        };
        const tweets = await apiRequest(`users/${userId}/tweets`, params);

        const riotweets = (tweets.data || []).filter((tweet: Tweet) => IsRioRelated(tweet));
        return riotweets;
    } catch (error) {
        console.error("Error fetching user tweets:", error);
        throw error;
    }

}