import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface JWTPayload {
  userId: number;
  email: string;
}

function getUserFromToken(request: NextRequest): JWTPayload | null {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

// GET /api/notes - Get all notes for user
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await pool.query(
      'SELECT id, title, content, created_at, updated_at FROM notes WHERE user_id = $1 ORDER BY updated_at DESC',
      [user.userId]
    );

    return NextResponse.json({ notes: result.rows });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/notes - Create new note
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content = '' } = await request.json();
    
    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const result = await pool.query(
      'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, created_at, updated_at',
      [title.trim(), content, user.userId]
    );

    return NextResponse.json({ note: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
