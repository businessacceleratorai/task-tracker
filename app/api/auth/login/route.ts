import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Minimal login API called')
    
    // Just return success for now to test if the API is working
    const response = NextResponse.json({
      success: true,
      message: 'Login API is working!',
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User'
      }
    })

    console.log('✅ Minimal login successful!')
    return response

  } catch (error) {
    console.error('❌ Minimal login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
