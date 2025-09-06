import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db/sqlite-connection'
import { hashPassword, generateToken } from '@/lib/auth/utils'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase())

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)
    const insertUser = db.prepare(`
      INSERT INTO users (email, password_hash, name) 
      VALUES (?, ?, ?) 
    `)
    
    const result = insertUser.run(email.toLowerCase(), passwordHash, name || null)
    const userId = result.lastInsertRowid

    // Get the created user
    const user = db.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?').get(userId)

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    // Create response with token in cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at
      },
      token
    })

    // Set HTTP-only cookie for browser-based auth
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
