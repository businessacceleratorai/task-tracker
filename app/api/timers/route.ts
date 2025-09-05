import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db/connection'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM timers ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching timers:', error)
    return NextResponse.json({ error: 'Failed to fetch timers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, duration, remaining } = await request.json()
    const result = await pool.query(
      'INSERT INTO timers (name, duration, remaining) VALUES ($1, $2, $3) RETURNING *',
      [name, duration, remaining]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating timer:', error)
    return NextResponse.json({ error: 'Failed to create timer' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await pool.query('DELETE FROM timers')
    return NextResponse.json({ message: 'All timers deleted' })
  } catch (error) {
    console.error('Error deleting timers:', error)
    return NextResponse.json({ error: 'Failed to delete timers' }, { status: 500 })
  }
}
