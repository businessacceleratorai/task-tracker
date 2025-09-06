import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// In-memory store (shared with register route - will reset on each deployment, but works for testing)
let users: Array<{
  id: number
  email: string
  name?: string
  password_hash: string
  created_at: string
}> = []

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Login API called')
    
    const { email, password } = await request.json()
    console.log('📝 Request data:', { email, passwordLength: password?.length })

    // Validate input
    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log('✅ Input validation passed')

    // Find user by email
    console.log('🔍 Looking for user:', email)
    const user = users.find(u => u.email === email)

    if (!user) {
      console.log('❌ User not found:', email)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('✅ User found:', { id: user.id, email: user.email, name: user.name })

    // Verify password using built-in crypto
    console.log('🔍 Verifying password...')
    try {
      const [salt, hash] = user.password_hash.split(':')
      const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
      const isValidPassword = hash === verifyHash
      
      if (!isValidPassword) {
        console.log('❌ Invalid password for user:', email)
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }
      
      console.log('✅ Password verified successfully')
    } catch (error) {
      console.log('❌ Password verification error:', error)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

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

    console.log('🎉 Login successful!')
    return response

  } catch (error) {
    console.error('❌ Login error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
