import { NextAuthOptions } from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"


export const authOptions:NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        Twitter({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
            version: '2.0',
        }),
    ],

    callbacks: {
        async jwt({ account, token }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }

            return token
        },

        // async session({ session }) {
        //     return {
        //         ...session,
        //         user: {
        //             ...session.user,
        //             isActive: true,
        //             isAdmin: true
        //         }
        //     }
        // },

        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl // Default to home page
        },
    },


    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}
