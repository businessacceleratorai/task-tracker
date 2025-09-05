import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db/connection'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { next_trigger, is_active } = await request.json()
    
    const result = await pool.query(
      'UPDATE reminders SET next_trigger = $1, is_active = $2 WHERE id = $3 RETURNING *',
      [next_trigger, is_active, params.id]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Reminder not found' }, { status: 404 })
    }
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating reminder:', error)
    return NextResponse.json({ error: 'Failed to update reminder' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query('DELETE FROM reminders WHERE id = $1 RETURNING *', [params.id])
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Reminder not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Reminder deleted' })
  } catch (error) {
    console.error('Error deleting reminder:', error)
    return NextResponse.json({ error: 'Failed to delete reminder' }, { status: 500 })
  }
}
