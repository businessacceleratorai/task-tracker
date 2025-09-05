import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db/connection'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM reminders ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, type, interval_seconds, next_trigger } = await request.json()
    const result = await pool.query(
      'INSERT INTO reminders (name, type, interval_seconds, next_trigger) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type, interval_seconds, next_trigger]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating reminder:', error)
    return NextResponse.json({ error: 'Failed to create reminder' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await pool.query('DELETE FROM reminders')
    return NextResponse.json({ message: 'All reminders deleted' })
  } catch (error) {
    console.error('Error deleting reminders:', error)
    return NextResponse.json({ error: 'Failed to delete reminders' }, { status: 500 })
  }
}
