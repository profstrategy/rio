import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. CHECK FOR REFERRAL CODE
  const refCode = request.nextUrl.searchParams.get("ref");
  if (refCode) {
    // Save it in a cookie for 30 days
    response.cookies.set("referral_code", refCode, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // Secure
    });
  }

  // 2. AUTH CHECK (NextAuth JWT Token)
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  const user = token?.sub; // This contains the user object from NextAuth session

  // Protect Dashboard: If no user, kick to home
  if (!user && request.nextUrl.pathname.startsWith("/user-task/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Protect Login: If user exists, kick to dashboard
  if (user && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/user-task/dashboard", request.url));
  }

  const ADMIN_USERS = ['Dreamcoinbnb', 'AnotherAdmin']; 

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
       return NextResponse.redirect(new URL("/", request.url));
    }
    
    // Check if their username is in the allowed list
    const username = token.username || token.name; // Twitter handle from NextAuth
    if (!ADMIN_USERS.includes(username ?? '')) {
       return NextResponse.redirect(new URL("/dashboard", request.url)); // Kick them out
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}