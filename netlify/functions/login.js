exports.handler = async (event, context) => {
  console.log('🚀 Direct Netlify Function called - login')
  console.log('Method:', event.httpMethod)
  console.log('Headers:', JSON.stringify(event.headers, null, 2))
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    console.log('✅ Direct Netlify Function - Login successful!')
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Direct Netlify Function login is working!',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User'
        }
      })
    }

  } catch (error) {
    console.error('❌ Direct Netlify Function error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}
