import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.PGHOST || 'db.srgvovfooypxprpwxyhn.supabase.co',
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'postgres',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  // Force IPv4 connection to avoid IPv6 issues in serverless environments
  options: '-c default_transaction_isolation=read_committed',
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 10,
  // Force IPv4 by using the connection string approach
  connectionString: process.env.DATABASE_URL
})

export default pool
