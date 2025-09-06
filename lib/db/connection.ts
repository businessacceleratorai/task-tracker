import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.PGHOST || 'db.srgvovfooypxprpwxyhn.supabase.co',
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'postgres',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool
