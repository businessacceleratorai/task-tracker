'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Folder, 
  FolderOpen, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  folder_id: number;
  created_at: string;
  updated_at: string;
}

interface FolderData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface FolderItemProps {
  folder: FolderData;
  notes: Note[];
  isExpanded: boolean;
  selectedNoteId: number | null;
  onToggleExpand: (folderId: number) => void;
  onNoteSelect: (note: Note) => void;
  onRenameFolder: (folderId: number, newName: string) => void;
  onDeleteFolder: (folderId: number) => void;
  onDeleteNote: (noteId: number) => void;
  getPreview: (content: string) => string;
}

export function FolderItem({
  folder,
  notes,
  isExpanded,
  selectedNoteId,
  onToggleExpand,
  onNoteSelect,
  onRenameFolder,
  onDeleteFolder,
  onDeleteNote,
  getPreview
}: FolderItemProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);

  const handleRename = () => {
    if (newName.trim() && newName.trim() !== folder.name) {
      onRenameFolder(folder.id, newName.trim());
    }
    setIsRenaming(false);
    setNewName(folder.name);
  };

  const handleCancelRename = () => {
    setIsRenaming(false);
    setNewName(folder.name);
  };

  const folderNotes = notes.filter(note => note.folder_id === folder.id);

  return (
    <div className="mb-2">
      {/* Folder Header */}
      <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg group">
        <div className="flex items-center flex-1 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 mr-1"
            onClick={() => onToggleExpand(folder.id)}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
          
          {isExpanded ? (
            <FolderOpen className="h-4 w-4 mr-2 text-blue-500" />
          ) : (
            <Folder className="h-4 w-4 mr-2 text-blue-500" />
          )}
          
          {isRenaming ? (
            <div className="flex items-center gap-1 flex-1">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-6 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename();
                  if (e.key === 'Escape') handleCancelRename();
                }}
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleRename}
              >
                <Check className="h-3 w-3 text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleCancelRename}
              >
                <X className="h-3 w-3 text-red-600" />
              </Button>
            </div>
          ) : (
            <span className="text-sm font-medium truncate">
              {folder.name} ({folderNotes.length})
            </span>
          )}
        </div>
        
        {/* Folder Actions */}
        {!isRenaming && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsRenaming(true)}
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              onClick={() => onDeleteFolder(folder.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Notes in Folder */}
      {isExpanded && (
        <div className="ml-6 space-y-1">
          {folderNotes.map((note) => (
            <div
              key={note.id}
              className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                selectedNoteId === note.id
                  ? 'bg-primary/10 border border-primary/20'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => onNoteSelect(note)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate mb-1">
                    {note.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {getPreview(note.content) || 'No content'}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {new Date(note.updated_at).toLocaleDateString()}
                  </div>
                </div>
                
                {/* Note Actions */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {folderNotes.length === 0 && (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No notes in this folder
            </div>
          )}
        </div>
      )}
    </div>
  );
}
