import { NextRequest, NextResponse } from "next/server";
import { getDashboardForRole, isPublicPath } from "@/utils/roleRoutes";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1. Skip Next.js internal assets, public static files, and icons
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.png" ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Extract authenticated user from cookies
  const userCookie = req.cookies.get("gdh_user")?.value;
  let user: any = null;

  if (userCookie) {
    try {
      user = JSON.parse(decodeURIComponent(userCookie));
    } catch {
      try {
        user = JSON.parse(userCookie);
      } catch {
        user = null;
      }
    }
  }

  const isAuthenticated = Boolean(user && (user.user_id || user.username));

  // 3. Handle Root path '/'
  if (pathname === "/") {
    if (isAuthenticated) {
      const destination = getDashboardForRole(user.role_code);
      return NextResponse.redirect(new URL(destination, req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. Handle Authenticated User accessing Login / Auth pages
  if (isAuthenticated && isPublicPath(pathname) && !pathname.startsWith("/track")) {
    const destination = getDashboardForRole(user.role_code);
    return NextResponse.redirect(new URL(destination, req.url));
  }

  // 5. Handle Unauthenticated User accessing Protected Routes
  if (!isAuthenticated && !isPublicPath(pathname)) {
    // For API requests, return 401 JSON
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { success: false, error: "Authentication required. Please log in." },
        { status: 401 }
      );
    }

    // For page requests, redirect to /login with redirect return parameter
    const redirectParam = encodeURIComponent(`${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`/login?redirect=${redirectParam}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (template assets)
     * - favicon
     */
    "/((?!_next/static|_next/image|assets|favicon.ico|favicon.png).*)",
  ],
};
