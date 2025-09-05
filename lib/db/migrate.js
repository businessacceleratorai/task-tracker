const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
  console.log('🚀 Starting database migration...');
  
  try {
    const client = await pool.connect();
    console.log('✅ Connected to database');

    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await client.query(schema);
    console.log('✅ Database schema created successfully');

    // Create default folder for new users
    console.log('✅ Migration completed successfully!');
    
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check your DATABASE_URL in .env.local');
    console.error('2. Ensure database exists and user has permissions');
    console.error('3. Verify PostgreSQL/Supabase is running');
    process.exit(1);
  }
}

runMigration();
