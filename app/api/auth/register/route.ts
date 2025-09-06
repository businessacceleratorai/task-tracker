import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// In-memory store (will reset on each deployment, but works for testing)
let users: Array<{
  id: number
  email: string
  name?: string
  password_hash: string
  created_at: string
}> = []

let nextUserId = 1

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Registration API called')
    
    const { email, password, name } = await request.json()
    console.log('📝 Request data:', { email, name, passwordLength: password?.length })

    // Validate input
    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      console.log('❌ Validation failed: Password too short')
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    console.log('✅ Input validation passed')

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      console.log('❌ User already exists:', email)
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    console.log('✅ User does not exist, proceeding with registration')

    // Hash password using built-in crypto
    console.log('🔐 Hashing password...')
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    const passwordHash = `${salt}:${hash}`
    console.log('✅ Password hashed successfully')

    // Create user
    console.log('👤 Creating user...')
    const user = {
      id: nextUserId++,
      email,
      name: name || undefined,
      password_hash: passwordHash,
      created_at: new Date().toISOString()
    }
    users.push(user)
    console.log('✅ User created successfully:', { id: user.id, email: user.email, name: user.name })

    // Generate JWT token using built-in crypto
    console.log('🎫 Generating JWT token...')
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    }
    
    const now = Math.floor(Date.now() / 1000)
    const jwtPayload = {
      userId: user.id,
      email: user.email,
      iat: now,
      exp: now + (7 * 24 * 60 * 60) // 7 days
    }
    
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url')
    const encodedPayload = Buffer.from(JSON.stringify(jwtPayload)).toString('base64url')
    
    const signature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url')
    
    const token = `${encodedHeader}.${encodedPayload}.${signature}`
    console.log('✅ JWT token generated successfully')

    // Create response
    console.log('📤 Creating response...')
    const responseData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at
      },
      token
    }

    const response = NextResponse.json(responseData)

    // Set HTTP-only cookie for browser-based auth
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    console.log('🎉 Registration successful!')
    return response

  } catch (error) {
    console.error('❌ Registration error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
