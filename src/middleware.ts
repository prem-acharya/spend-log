import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/api/auth"];
const DEFAULT_REDIRECT = "/dashboard";

export default auth((req) => {
  const isAuthenticated = Boolean(req.auth);
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Handle public routes
  if (isPublicRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.nextUrl));
    }
    return NextResponse.next();
  }

  // Protect private routes
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

// Optimize middleware matching
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
