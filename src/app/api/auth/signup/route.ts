import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma/client"
import { 
  generateApiToken, 
  generateToken, 
  hashPassword, 
  getApiTokenFromHeader, 
  verifyApiToken,
  setAuthCookie 
} from "@/utils/auth"
import { signupSchema } from "@/validation/auth"

export async function POST(request: Request) {
  try {
    // Verify API token from Bearer header
    const apiToken = getApiTokenFromHeader(request)
    const isValidToken = await verifyApiToken(apiToken)
    
    if (!isValidToken) {
      return NextResponse.json(
        { message: "don't have permission!" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    // Hash password and generate API token
    const [hashedPassword, userApiToken] = await Promise.all([
      hashPassword(password),
      generateApiToken(),
    ])

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        apiToken: userApiToken,
      },
      select: {
        id: true,
        name: true,
        email: true,
        apiToken: true,
      },
    })

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
        { message: "Invalid request data!" },
        { status: 400 }
      )
    }

    console.error("[SIGNUP_ERROR]", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}