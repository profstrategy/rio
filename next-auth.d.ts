import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      twitterId?: string
      username?: string
      engagementScore?: number
    } & DefaultSession["user"]
  }
}