// _lib/auth.ts
import NextAuth, { NextAuthOptions, Account } from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import TwitterProvider from "next-auth/providers/twitter"
import prisma from "@/lib/prisma"
import { JWT } from "next-auth/jwt"
import { TwitterProfile } from "@/constants/types"
import clientPromise from "@/lib/mongodb"

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = "https://api.twitter.com/2/oauth2/token"

    const basicAuth = Buffer.from(
      `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
    ).toString("base64")

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken!,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      console.error("Token refresh failed:", refreshedTokens)
      throw refreshedTokens
    }

    console.log("✅ Token refreshed successfully")
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

    return newToken
  } catch (error) {
    console.error("Error refreshing access token:", error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          // IMPORTANT: All scopes needed for $RIO tracking
          scope: [
            "tweet.read",
            "users.read",
            "follows.read",
            "like.read",
            "offline.access", // Critical for refresh tokens
          ].join(" "),
        },
      },
      // Optional: Add profile fields
      profile(profile) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          email: null,
          image: profile.data.profile_image_url,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Store Twitter-specific data when user signs in
      if (account?.provider === "twitter" && profile) {
        try {
          // Extract Twitter data from profile
          const twitterData = profile as TwitterProfile

          await new Promise(resolve => setTimeout(resolve, 300))

          await prisma.user.upsert({
            where: { id: user.id },
            update: {
              twitterId: twitterData?.data?.id,
              username: twitterData?.data?.username,
              displayName: twitterData?.data?.name,
              lastSyncedAt: new Date(),
            },
            create: {
              id: user.id,
              name: twitterData?.data?.name,
              email: user.email || null,
              image: twitterData?.data?.profile_image_url,
              twitterId: twitterData?.data?.id,
              username: twitterData?.data?.username,
              displayName: twitterData?.data?.name,
              engagementScore: 0,
              totalTweets: 0,
              totalRetweets: 0,
              totalLikes: 0,
              totalReplies: 0,
              weeklyScore: 0,
              monthlyScore: 0,
              badge: 'NORMAL',
              lastSyncedAt: new Date(),
            },
          })
          console.log("✅ User upserted successfully:", {
            userId: user.id,
            twitterId: twitterData?.data?.id,
            username: twitterData?.data?.username
          })
        } catch (error) {
          console.error("Error updating user Twitter data:", error)
        }
      }

      return true
    },

    async jwt({ token, account, user, profile }) {
      // Initial sign in
      if (account && user) {
        // Extract Twitter username from profile
        const twitterData = profile as TwitterProfile

        // Store tokens and user data in JWT
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 7200 * 1000, // Default 2 hours
          // twitterId: twitterData?.data?.id,
          username: twitterData?.data?.username,
        }
      }

      // Return previous token if access token has not expired
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, refresh it
      console.log("Access token expired, refreshing...")
      return await refreshAccessToken(token)
    },

    async session({ session, token, user }) {
      if (session?.user && token.sub) {
        // Fetch latest user data from database
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            id: true,
            twitterId: true,
            username: true,
            displayName: true,
            engagementScore: true,
            totalTweets: true,
            totalRetweets: true,
            totalLikes: true,
            lastSyncedAt: true,
          },
        })

        // Build session with both token and database data
        session.user = {
          ...session.user,
          id: token.sub,
          twitterId: dbUser?.twitterId ?? token.twitterId ?? '',
          username: dbUser?.username ?? token.username ?? '',
          accessToken: token.accessToken as string ?? '',
          name: dbUser?.displayName || session.user.name,
          engagementScore: dbUser?.engagementScore || 0,
          totalTweets: dbUser?.totalTweets || 0,
          totalRetweets: dbUser?.totalRetweets || 0,
          totalLikes: dbUser?.totalLikes || 0,
        }

        // Pass refresh error to frontend if exists
        if (token.error) {
          session.error = token.error as string
        }
      }

      return session
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)