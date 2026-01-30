import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      twitterId: string
      username: string
      name?: string | null
      email?: string | null
      image?: string | null
      accessToken: string
      avatarUrl:string
    }
    error?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
    twitterId?: string
    username?: string
  }
}