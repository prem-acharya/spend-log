import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface TokenPayload extends JWTPayload {
  id: string;
  email: string;
  name: string;
}

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export async function generateToken(payload: TokenPayload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function generateApiToken() {
  const token = crypto.randomUUID();
  return await hashPassword(token);
}

export function getTokenFromHeader(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1];
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export function getApiTokenFromHeader(req: NextRequest | Request) {
  return req.headers.get("x-api-token");
}

export async function verifyApiToken(apiToken: string | null) {
  if (!apiToken) return false;
  if (!process.env.API_TOKEN_SECRET) return false;

  try {
    return await compare(process.env.API_TOKEN_SECRET, apiToken);
  } catch {
    return false;
  }
}
