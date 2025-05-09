
import React, { useState } from 'react';
import { TutorNote } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';

interface TutorNotesProps {
  studentId: string;
  notes: TutorNote[];
}

const TutorNotes: React.FC<TutorNotesProps> = ({ studentId, notes }) => {
  const [newNote, setNewNote] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const { addNote } = useApp();
  
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    addNote(studentId, newNote, priority);
    setNewNote('');
  };
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-edu-red text-white';
      case 'medium':
        return 'bg-edu-yellow text-black';
      case 'low':
        return 'bg-edu-green text-white';
      default:
        return 'bg-secondary';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Tutor Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes added yet</p>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {notes.map(note => (
              <div key={note.id} className="p-3 bg-secondary/50 rounded-md">
                <div className="flex justify-between items-start">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(note.priority)}`}>
                    {note.priority.charAt(0).toUpperCase() + note.priority.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
                <p className="mt-2 text-sm">{note.content}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="pt-3 border-t">
          <Textarea
            placeholder="Add a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[80px] mb-2"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Priority:</span>
              <div className="flex gap-1">
                <Button 
                  variant={priority === 'low' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setPriority('low')}
                  className={priority === 'low' ? 'bg-edu-green text-white' : ''}
                >
                  Low
                </Button>
                <Button 
                  variant={priority === 'medium' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setPriority('medium')}
                  className={priority === 'medium' ? 'bg-edu-yellow text-black' : ''}
                >
                  Medium
                </Button>
                <Button 
                  variant={priority === 'high' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setPriority('high')}
                  className={priority === 'high' ? 'bg-edu-red text-white' : ''}
                >
                  High
                </Button>
              </div>
            </div>
            <Button onClick={handleAddNote} size="sm">Add Note</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorNotes;
