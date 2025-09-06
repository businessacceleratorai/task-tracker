const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

async function migrate() {
  try {
    console.log('🚀 Starting database migration...')
    
    // Test connection
    const client = await pool.connect()
    console.log('✅ Database connected successfully')
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    await client.query(schema)
    console.log('✅ Database schema created successfully')
    
    // Create a test user for development
    const testUserEmail = 'test@example.com'
    const testUserPassword = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: password
    
    const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [testUserEmail])
    
    if (existingUser.rows.length === 0) {
      await client.query(
        'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3)',
        [testUserEmail, 'Test User', testUserPassword]
      )
      console.log('✅ Test user created: test@example.com (password: password)')
    } else {
      console.log('ℹ️  Test user already exists')
    }
    
    client.release()
    console.log('🎉 Migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run migration if called directly
if (require.main === module) {
  migrate()
}

module.exports = { migrate }
