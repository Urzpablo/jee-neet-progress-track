
import React, { createContext, useContext, useState } from 'react';
import { UserRole, Student } from '@/types';
import { mockStudents, getStudentById } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

type AppContextType = {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  students: Student[];
  currentStudent: Student | null;
  setCurrentStudent: (studentId: string) => void;
  addNote: (studentId: string, content: string, priority: 'low' | 'medium' | 'high') => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('tutor');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [currentStudent, setCurrentStudentState] = useState<Student | null>(mockStudents[0]);

  const setCurrentStudent = (studentId: string) => {
    const student = getStudentById(studentId);
    if (student) {
      setCurrentStudentState(student);
    } else {
      toast({
        title: "Student not found",
        description: `No student with ID ${studentId} found.`,
        variant: "destructive"
      });
    }
  };

  const addNote = (studentId: string, content: string, priority: 'low' | 'medium' | 'high') => {
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        if (student.id === studentId) {
          const newNote = {
            id: `note-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            content,
            priority
          };
          
          return {
            ...student,
            tutorNotes: [newNote, ...student.tutorNotes]
          };
        }
        return student;
      });
    });
    
    // Also update current student if it's the same one
    if (currentStudent && currentStudent.id === studentId) {
      setCurrentStudentState(prevStudent => {
        if (!prevStudent) return null;
        
        const newNote = {
          id: `note-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          content,
          priority
        };
        
        return {
          ...prevStudent,
          tutorNotes: [newNote, ...prevStudent.tutorNotes]
        };
      });
    }
    
    toast({
      title: "Note added",
      description: "Your note has been added successfully."
    });
  };

  const value = {
    userRole,
    setUserRole,
    students,
    currentStudent,
    setCurrentStudent,
    addNote
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
