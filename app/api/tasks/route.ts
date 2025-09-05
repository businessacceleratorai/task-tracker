import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db/connection'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    const result = await pool.query(
      'INSERT INTO tasks (text) VALUES ($1) RETURNING *',
      [text]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await pool.query('DELETE FROM tasks')
    return NextResponse.json({ message: 'All tasks deleted' })
  } catch (error) {
    console.error('Error deleting tasks:', error)
    return NextResponse.json({ error: 'Failed to delete tasks' }, { status: 500 })
  }
}
