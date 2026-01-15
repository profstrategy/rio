import { prisma } from "@/lib/prisma"
import { JWT } from "next-auth/jwt"

export async function refreshAccessToken(token: JWT): Promise<string> {
  try {
    const url = "https://api.twitter.com/2/oauth2/token"

    const basicAuth = Buffer.from(
      `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
    ).toString("base64")
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken!,
        client_id: process.env.TWITTER_CLIENT_ID!,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    const newToken = {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token,
    }

    // Update the refresh token in database
    try {
      await prisma.account.updateMany({
        where: {
          provider: "twitter",
          providerAccountId: token.sub as string,
        },
        data: {
          access_token: refreshedTokens.access_token,
          refresh_token: refreshedTokens.refresh_token,
          expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
        },
      })
    } catch (dbError) {
      console.error("Failed to update tokens in database:", dbError)
    }

    return token.accessToken ?? ''
  } catch (error) {
    console.error("Error refreshing access token:", error)
    
    return  token.error ?? ''
  }
}
