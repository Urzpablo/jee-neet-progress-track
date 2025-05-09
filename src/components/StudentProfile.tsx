
import React from 'react';
import { Student } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Book } from 'lucide-react';

interface StudentProfileProps {
  student: Student;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  const attendancePercentage = Math.round((student.attendance.present / student.attendance.total) * 100);
  
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={student.profileImage || '/placeholder.svg'} 
                alt={student.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-xl">{student.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Grade: {student.grade} • Target: {student.targetExam} {student.targetYear}
              </p>
            </div>
          </div>
          <Badge variant={attendancePercentage > 90 ? "default" : "secondary"}>
            Attendance: {attendancePercentage}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-edu-purple" />
              <span className="font-medium text-sm">Recent Activity</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {student.dailyPractice.length > 0 
                ? `Last practice: ${student.dailyPractice[0].topic} (${student.dailyPractice[0].date})`
                : "No recent activity"
              }
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2">
              <Book size={16} className="text-edu-purple" />
              <span className="font-medium text-sm">Latest Test</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {student.mockTests.length > 0 
                ? `Score: ${student.mockTests[0].score}/100 (${student.mockTests[0].percentile}%ile)`
                : "No tests taken yet"
              }
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Overall Progress</h3>
          <Progress value={65} className="h-2" />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Current: 65%</span>
            <span className="text-xs text-muted-foreground">Target: 90%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfile;
