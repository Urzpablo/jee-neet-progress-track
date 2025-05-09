
export type UserRole = 'tutor' | 'parent';

export type Subject = 'physics' | 'chemistry' | 'mathematics' | 'biology';

export type Skill = {
  id: string;
  name: string;
  description: string;
  score: number; // 1-10
  idealScore: number; // The ideal score for a topper
  subject: Subject;
};

export type Topic = {
  id: string;
  name: string;
  subject: Subject;
  accuracy: number; // percentage
  lastTestedDate?: string;
};

export type MockTest = {
  id: string;
  date: string;
  score: number;
  percentile: number;
  subjectScores: {
    [key in Subject]?: number;
  };
  duration: number; // in minutes
};

export type DailyPractice = {
  id: string;
  date: string;
  topic: string;
  subject: Subject;
  questionsAttempted: number;
  questionsCorrect: number;
  timeSpent: number; // in minutes
};

export type TutorNote = {
  id: string;
  date: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
};

export type Student = {
  id: string;
  name: string;
  profileImage?: string;
  grade: string;
  targetExam: 'JEE' | 'NEET';
  targetYear: number;
  skills: Skill[];
  weakTopics: Topic[];
  strongTopics: Topic[];
  mockTests: MockTest[];
  dailyPractice: DailyPractice[];
  attendance: {
    present: number;
    total: number;
  };
  tutorNotes: TutorNote[];
};
