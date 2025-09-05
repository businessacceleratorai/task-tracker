'use client';

import React, { useState, useEffect } from 'react';
import { NotesSidebar } from './NotesSidebar';
import { NotesEditor } from './NotesEditor';
import { toast } from 'sonner';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes);
      } else {
        console.error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create new note
  const handleNewNote = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Untitled Note',
          content: ''
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newNote = data.note;
        setNotes(prev => [newNote, ...prev]);
        setSelectedNote(newNote);
        toast.success('New note created');
      } else {
        toast.error('Failed to create note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    }
  };

  // Save note (create or update)
  const handleSaveNote = async (noteId: number | null, title: string, content: string) => {
    try {
      if (noteId) {
        // Update existing note
        const response = await fetch(`/api/notes/${noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
          const data = await response.json();
          const updatedNote = data.note;
          
          setNotes(prev => prev.map(note => 
            note.id === noteId ? updatedNote : note
          ));
          setSelectedNote(updatedNote);
          toast.success('Note saved');
        } else {
          throw new Error('Failed to update note');
        }
      } else {
        // This shouldn't happen as we create notes immediately, but handle it
        await handleNewNote();
      }
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId: number) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(prev => prev.filter(note => note.id !== noteId));
        
        // If the deleted note was selected, clear selection
        if (selectedNote?.id === noteId) {
          setSelectedNote(null);
        }
        
        toast.success('Note deleted');
      } else {
        toast.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  };

  // Select note
  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-background">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNote?.id || null}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNoteSelect={handleNoteSelect}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
      />
      
      <NotesEditor
        note={selectedNote}
        onSave={handleSaveNote}
        onClose={() => setSelectedNote(null)}
      />
    </div>
  );
}
