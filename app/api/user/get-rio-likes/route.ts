import { NextResponse } from "next/server";
import { apiRequest } from "../../helper"

export async function getUserLikes(userId: string, maxResults: number, accessToken: string) {
    try {
        const params = {
            'tweet.fields': 'author_id,public_metrics,created_at',
            'max_results': maxResults,
        }

        const likes = await apiRequest(`/users/${userId}/liked_tweets`, params, 'GET', accessToken);

        return likes.data || []
    } catch (error) {
        console.error("Error fetching user likes:", error);
        NextResponse.json({ error: 'failed to fetch likes' }, { status: 500 })
        throw error;
    }

}