import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: User
    }
}

interface User {
    isAdmin?: boolean
    isActive?: boolean
}