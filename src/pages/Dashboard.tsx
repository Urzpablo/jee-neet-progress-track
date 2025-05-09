import React from 'react';
import { useApp } from '@/contexts/AppContext';
import StudentProfile from '@/components/StudentProfile';
import RadarChart from '@/components/RadarChart';
import ProgressChart from '@/components/ProgressChart';
import TopicsList from '@/components/TopicsList';
import TutorNotes from '@/components/TutorNotes';
import PracticeInput from '@/components/PracticeInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { userRole, currentStudent } = useApp();
  
  if (!currentStudent) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome to JEE/NEET Progress Tracker</h2>
          <p className="text-muted-foreground">
            {userRole === 'tutor' 
              ? "Select a student from the sidebar to view their progress dashboard." 
              : "No student data available. Please contact your tutor."}
          </p>
        </div>
      </div>
    );
  }
  
  // Determine if this is a JEE or NEET student to show appropriate tabs
  const isJEE = currentStudent.targetExam === 'JEE';
  const thirdSubject = isJEE ? 'mathematics' : 'biology';
  const thirdSubjectName = isJEE ? 'Mathematics' : 'Biology';
  
  return (
    <div className="space-y-8">
      <StudentProfile student={currentStudent} />
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-medium">Skill Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="all">All Skills</TabsTrigger>
                <TabsTrigger value="physics">Physics</TabsTrigger>
                <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                <TabsTrigger value={thirdSubject}>{thirdSubjectName}</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <RadarChart 
                  skills={currentStudent.skills} 
                  height={350}
                />
              </TabsContent>
              <TabsContent value="physics">
                <RadarChart 
                  skills={currentStudent.skills} 
                  subject="physics"
                  height={350}
                />
              </TabsContent>
              <TabsContent value="chemistry">
                <RadarChart 
                  skills={currentStudent.skills} 
                  subject="chemistry"
                  height={350}
                />
              </TabsContent>
              <TabsContent value={thirdSubject}>
                <RadarChart 
                  skills={currentStudent.skills} 
                  subject={thirdSubject}
                  height={350}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <TopicsList 
            topics={currentStudent.weakTopics.slice(0, 3)} 
            title="Weak Areas (Needs Focus)" 
            type="weak"
          />
          
          <TopicsList 
            topics={currentStudent.strongTopics.slice(0, 3)} 
            title="Strong Areas" 
            type="strong"
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressChart 
            mockTests={currentStudent.mockTests} 
            height={300}
          />
        </CardContent>
      </Card>
      
      {userRole === 'tutor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TutorNotes 
            studentId={currentStudent.id} 
            notes={currentStudent.tutorNotes}
          />
          
          <PracticeInput studentId={currentStudent.id} />
        </div>
      )}
      
      {userRole === 'parent' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Tutor's Notes & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentStudent.tutorNotes.length === 0 ? (
                <p className="text-muted-foreground">No notes from tutor yet.</p>
              ) : (
                currentStudent.tutorNotes.map(note => {
                  const priorityColor = 
                    note.priority === 'high' ? 'border-l-edu-red' : 
                    note.priority === 'medium' ? 'border-l-edu-yellow' : 
                    'border-l-edu-green';
                    
                  return (
                    <div 
                      key={note.id} 
                      className={`p-4 border-l-4 ${priorityColor} bg-secondary/30 rounded-md`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{note.priority === 'high' ? '⚠️ Important' : ''}</span>
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="mt-1">{note.content}</p>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
