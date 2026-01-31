// _lib/auth.ts
import NextAuth, { NextAuthOptions, Account } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import { JWT } from "next-auth/jwt"
import { TwitterProfile } from "@/constants/types"
import { prisma } from "@/lib/prisma"


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
          providerAccountId: token.twitterId as string,
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
  // adapter: PrismaAdapter(prisma),

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          scope: [
            "tweet.read",
            "users.read",
            "follows.read",
            "like.read",
            "offline.access",
          ].join(" "),
        },
      },
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
      if (account?.provider === "twitter" && profile) {
        try {
          const twitterData = profile as TwitterProfile
          const twitterId = twitterData?.data?.id

          // Check if user exists by twitterId
          let dbUser = await prisma.user.findUnique({
            where: { twitterId: twitterId }
          })

          if (!dbUser) {
            // Create user if doesn't exist
            try {
              dbUser = await prisma.user.create({
                data: {
                  twitterId: twitterId,
                  username: twitterData?.data?.username,
                  displayName: twitterData?.data?.name,
                  avatarUrl: twitterData?.data?.profile_image_url,
                  dreamPoints: 0,
                  lastLoginDate: new Date(),
                },
              })
              console.log("✅ Created new user:", dbUser.id)
            } catch (createError: any) {
              // Race condition - another request created the user
              if (createError.code === 'P2002') {
                dbUser = await prisma.user.findUnique({
                  where: { twitterId: twitterId }
                })
                console.log("⚠️ Race condition caught, user already exists")
              } else {
                throw createError
              }
            }
          } else {
            // Update existing user
            await prisma.user.update({
              where: { id: dbUser.id },
              data: {
                username: twitterData?.data?.username,
                displayName: twitterData?.data?.name,
                avatarUrl: twitterData?.data?.profile_image_url,
                lastLoginDate: new Date(),
              },
            })
            console.log("✅ Updated existing user:", dbUser.id)
          }

          // Create or update Account record
          if (dbUser && account) {
            await prisma.account.upsert({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: twitterId,
                },
              },
              create: {
                userId: dbUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: twitterId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
              },
              update: {
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
              },
            })
            console.log("✅ Account record updated")
          }

        } catch (error) {
          console.error("❌ Error in signIn callback:", error)
          return false // Prevent sign in if error
        }
      }

      return true
    },

    async jwt({ token, account, user, profile }) {
      // Initial sign in
      if (account && profile) {
        const twitterData = profile as TwitterProfile

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 7200 * 1000,
          twitterId: twitterData?.data?.id,
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

    async session({ session, token }) {
      if (session?.user && token.twitterId) {
        // Fetch latest user data from database
        const dbUser = await prisma.user.findUnique({
          where: { twitterId: token.twitterId as string },
          select: {
            id: true,
            twitterId: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            lastLoginDate: true,
          },
        })

        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.twitterId!, // Use twitterId as the session user.id
            twitterId: dbUser.twitterId!,
            username: dbUser.username || '',
            name: dbUser.displayName,
            avatarUrl: dbUser.avatarUrl || '',
            accessToken: token.accessToken as string ?? '',
          }
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
    signIn: "/user-task/dashboard/",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)