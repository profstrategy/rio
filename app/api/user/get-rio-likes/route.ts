import { NextResponse } from "next/server";
import { apiRequest } from "../../helper"

export async function getUserLikes(userId: string, maxResults: number, accessToken: string) {
    try {
        const params = {
            'tweet.fields': 'author_id,public_metrics,created_at',
            'max_results': maxResults,
        }

        const result = await apiRequest(`/users/${userId}/liked_tweets`, params, 'GET', accessToken);

        if (result.error === 'rate_limited') {
            console.warn('User likes rate limited - returning empty array');
            return [];
        }

        return result.data || []
    } catch (error) {
        console.error("Error fetching user likes:", error);
        NextResponse.json({ error: 'failed to fetch likes' }, { status: 500 })
        return []
    }

}