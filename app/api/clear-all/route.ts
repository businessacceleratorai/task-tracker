import { NextResponse } from 'next/server'
import pool from '@/lib/db/connection'

export async function DELETE() {
  try {
    // Clear all data from all tables
    await pool.query('DELETE FROM tasks')
    await pool.query('DELETE FROM timers')
    await pool.query('DELETE FROM reminders')
    
    return NextResponse.json({ message: 'All data cleared successfully' })
  } catch (error) {
    console.error('Error clearing all data:', error)
    return NextResponse.json({ error: 'Failed to clear all data' }, { status: 500 })
  }
}
