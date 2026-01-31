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
    response.cookies.set("referral_code", refCode, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
  }

  // 2. AUTH CHECK (NextAuth JWT Token)
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  const user = token?.sub;

  // Protect Dashboard: If no user, kick to home
  if (!user && request.nextUrl.pathname.startsWith("/user-task/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Parse ADMIN_USERS from comma-separated string
  const ADMIN_USERS = process.env.ADMIN_USERS?.split(',').map(u => u.trim()) || [];
  const username = token?.username || token?.name || '';
  const isAdmin = ADMIN_USERS.includes(username);

  // console.log('🔍 Admin check:', {
  //   path: request.nextUrl.pathname,
  //   username,
  //   adminList: ADMIN_USERS,
  //   isAdmin
  // });

  
  if (user && isAdmin && request.nextUrl.pathname === "/user-task/dashboard") {
    // console.log('🔄 Redirecting admin to admin page');
    return NextResponse.redirect(new URL("/user-task/admin", request.url));
  }

  // Protect Login: If user exists, kick to appropriate dashboard
  if (user && request.nextUrl.pathname === "/") {
    if (isAdmin) {
      // console.log('🔄 Redirecting admin to admin page from home');
      return NextResponse.redirect(new URL("/user-task/admin", request.url));
    }
    return NextResponse.redirect(new URL("/user-task/dashboard", request.url));
  }

  // Protect Admin Page: Only admins allowed
  if (request.nextUrl.pathname.startsWith("/user-task/admin")) {
    if (!user) {
       return NextResponse.redirect(new URL("/", request.url));
    }
    
    if (!isAdmin) {
      //  console.log('❌ Non-admin trying to access admin - redirecting to dashboard');
       return NextResponse.redirect(new URL("/user-task/dashboard", request.url));
    }
    
    // console.log('✅ Admin access granted');
  }

  // Prevent non-admins from accessing dashboard if they should be somewhere else
  if (user && !isAdmin && request.nextUrl.pathname.startsWith("/user-task/admin")) {
    return NextResponse.redirect(new URL("/user-task/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}