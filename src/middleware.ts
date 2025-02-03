import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getApiTokenFromHeader, verifyApiToken } from "@/lib/auth/utils";

export default withAuth(
  (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.nextauth.token;
    const isAuthPage = nextUrl.pathname.startsWith("/login");
    const isApiRoute = nextUrl.pathname.startsWith("/api");

    // API Route Protection
    if (isApiRoute) {
      const apiToken = getApiTokenFromHeader(req);
      const isValidToken = verifyApiToken(apiToken);

      if (!isLoggedIn && !isValidToken) {
        return new NextResponse("API Access Denied!", {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "X-API-Token": process.env.API_TOKEN_SECRET ?? "",
          },
        });
      }
    }

    // Existing auth page handling
    if (isAuthPage) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
      }
      return null;
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/api/:path*"],
};
