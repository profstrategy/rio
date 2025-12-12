// _lib/auth.ts or pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          scope: "users.read tweet.read offline.access",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Just return true - let the adapter handle user creation
      return true
    },

    async session({ session, user }) {
      if (session?.user) {
        // Fetch user from database with Twitter data
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            twitterId: true,
            username: true,
            displayName: true,
            engagementScore: true,
            totalTweets: true,
            totalRetweets: true,
            totalLikes: true,
          },
        })

        // Fetch associated account for access token session persistence
        const userAccount = await prisma.account.findFirst({
          where: {
            userId: user.id
          }, 
          select: {
            access_token: true
          }
        })

        // Add to session
        session.user = {
          ...session.user,
          id: user.id,
          twitterId: dbUser?.twitterId,
          username: dbUser?.username,
          accessToken: userAccount?.access_token,
          name: dbUser?.displayName || session.user.name, 
          engagementScore: dbUser?.engagementScore || 0,
        }
      }
      return session
    },
  },

  pages: {
    signIn: "/",
  },
}

export default NextAuth(authOptions)