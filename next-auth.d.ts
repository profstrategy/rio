import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      twitterId?: string
      username?: string
      accessToken?: string
      engagementScore?: number
    } & DefaultSession["user"]
  }
}