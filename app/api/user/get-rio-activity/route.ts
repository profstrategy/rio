import { NextResponse } from "next/server"
import { apiRequest } from "../../helper"

export async function searchRioUserActivity(username: string){
     try {
      const query = `from:${username} ($RIO OR $RioOnBonk OR #RIO OR #RioOnBonk)`
      
      const data = await apiRequest('/tweets/search/recent', {
        'query': query,
        'tweet.fields': 'public_metrics,created_at,entities,referenced_tweets',
        'max_results': 100,
      })
      
      return data.data || []
    } catch (error) {
      console.warn('Search requires elevated access:', error)
      return NextResponse.json({errormessage: 'Failed to fetch your activity'}, { status: 500 })
    }
  }