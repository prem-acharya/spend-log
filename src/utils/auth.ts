import { compare, hash } from "bcryptjs"
import { SignJWT, jwtVerify, JWTPayload } from "jose"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

interface TokenPayload extends JWTPayload {
  id: string
  email: string
  name: string
}

// Password utilities
export async function hashPassword(password: string) {
  return await hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

// JWT token utilities
export async function generateToken(payload: TokenPayload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload as TokenPayload
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// Cookie management
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get("token")
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
}

// API token utilities
export async function generateApiToken() {
  const token = crypto.randomUUID()
  return await hashPassword(token)
}

export function verifyApiAuthHeader(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const apiToken = request.headers.get("x-api-token")
  
  if (!authHeader?.startsWith("Bearer ") || apiToken !== process.env.NEXT_PUBLIC_API_TOKEN_SECRET) {
    return false
  }
  
  return true
}

export function getApiTokenFromHeader(req: NextRequest | Request) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) return null
  return authHeader.split(" ")[1]
}

export async function verifyApiToken(apiToken: string | null) {
  if (!apiToken || !process.env.NEXT_PUBLIC_API_TOKEN_SECRET) return false
  return apiToken === process.env.NEXT_PUBLIC_API_TOKEN_SECRET
}

export function getAuthHeaders() {
  return {
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN_SECRET}`,
    "Content-Type": "application/json",
  }
}