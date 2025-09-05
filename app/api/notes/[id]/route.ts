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

// GET /api/notes/[id] - Get specific note
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const noteId = parseInt(id);

    if (isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    const result = await pool.query(
      'SELECT id, title, content, created_at, updated_at FROM notes WHERE id = $1 AND user_id = $2',
      [noteId, user.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ note: result.rows[0] });
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/notes/[id] - Update note
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const noteId = parseInt(id);

    if (isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    const { title, content } = await request.json();

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING id, title, content, created_at, updated_at',
      [title.trim(), content || '', noteId, user.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ note: result.rows[0] });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/notes/[id] - Delete note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const noteId = parseInt(id);

    if (isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id',
      [noteId, user.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
