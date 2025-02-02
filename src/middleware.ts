import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken, getApiTokenFromHeader } from "@/utils/auth"

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ["/login", "/signup"]
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  // Get token from cookie
  const token = request.cookies.get("token")?.value

  if (!token && !isPublicPath) {
    // Redirect to login if no token and trying to access protected route
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isPublicPath) {
    // Redirect to dashboard if token exists and trying to access public route
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // For API routes, verify JWT token
  if (request.nextUrl.pathname.startsWith("/api")) {
    const apiToken = getApiTokenFromHeader(request)
    
    if (!apiToken || apiToken !== process.env.NEXT_PUBLIC_API_TOKEN_SECRET) {
      return NextResponse.json({ error: "Invalid API token" }, { status: 401 })
    }

    if (token) {
      try {
        const payload = await verifyToken(token)
        if (!payload) {
          return NextResponse.json({ error: "Invalid JWT token" }, { status: 401 })
        }
      } catch {
        return NextResponse.json({ error: "Invalid JWT token" }, { status: 401 })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}