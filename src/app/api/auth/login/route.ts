import { NextResponse } from "next/server"
import { z } from "zod"

import { prisma } from "@/lib/prisma/client"
import { 
  verifyPassword, 
  generateToken, 
  setAuthCookie,
  getApiTokenFromHeader,
  verifyApiToken 
} from "@/utils/auth"
import { loginSchema } from "@/validation/auth"

export async function POST(request: Request) {
  try {
    // Verify API token from Bearer header
    const apiToken = getApiTokenFromHeader(request)
    const isValidToken = await verifyApiToken(apiToken)
    
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Invalid API token" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        apiToken: true,
      },
    })

    if (!user || !await verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Generate JWT token and set cookie
    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    })
    
    await setAuthCookie(token)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      apiToken: user.apiToken,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      )
    }
    
    console.error("[LOGIN_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 