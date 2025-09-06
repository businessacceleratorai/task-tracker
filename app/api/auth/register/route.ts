import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Minimal registration API called')
    
    // Just return success for now to test if the API is working
    const response = NextResponse.json({
      success: true,
      message: 'Registration API is working!',
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User'
      }
    })

    console.log('✅ Minimal registration successful!')
    return response

  } catch (error) {
    console.error('❌ Minimal registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
