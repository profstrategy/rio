// app/api/user/test-twitter/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  const userId = session.user.twitterId || session.user.id;
  const url = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=entities,public_metrics,created_at&max_results=10`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${session.user.accessToken}`,
    }
  });

  const data = await response.json();

  return NextResponse.json({
    status: response.status,
    data,
    BASE_URL: process.env.BASE_URL,
    userId
  });
}