import { Student, Subject } from "@/types";

// Helper function to generate complete set of skills for JEE/NEET evaluation
const generateSkillScores = (subject: Subject, baseScore = 5) => {
  const randomOffset = () => Math.floor(Math.random() * 4) - 2;
  const baseIdealScore = 9;

  // Common skills for all subjects
  const commonSkills = [
    {
      id: `${subject}-speed`,
      name: 'Speed & Accuracy',
      description: 'How quickly and accurately problems are solved',
      score: Math.max(1, Math.min(10, baseScore - 1 + randomOffset())),
      idealScore: baseIdealScore,
      subject,
    },
    {
      id: `${subject}-logical`,
      name: 'Logical Reasoning',
      description: 'Ability to use logic to solve complex problems',
      score: Math.max(1, Math.min(10, baseScore + randomOffset())),
      idealScore: baseIdealScore,
      subject,
    },
    {
      id: `${subject}-time`,
      name: 'Time Management',
      description: 'Effectively utilizing available time during exams',
      score: Math.max(1, Math.min(10, baseScore + randomOffset())),
      idealScore: baseIdealScore,
      subject,
    },
    {
      id: `${subject}-exam`,
      name: 'Exam Strategy',
      description: 'Approach to maximizing score in exam conditions',
      score: Math.max(1, Math.min(10, baseScore + 1 + randomOffset())),
      idealScore: baseIdealScore,
      subject,
    },
  ];

  // Subject-specific skills
  let subjectSkills = [];
  
  if (subject === 'physics' || subject === 'chemistry' || subject === 'mathematics') {
    subjectSkills = [
      {
        id: `${subject}-problem`,
        name: 'Problem Solving',
        description: 'Ability to approach and solve complex problems',
        score: Math.max(1, Math.min(10, baseScore + 1 + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
      {
        id: `${subject}-concepts`,
        name: 'Conceptual Clarity',
        description: 'Understanding of fundamental concepts and principles',
        score: Math.max(1, Math.min(10, baseScore + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
      {
        id: `${subject}-formula`,
        name: 'Formula Application',
        description: 'Correctly applying formulas to solve problems',
        score: Math.max(1, Math.min(10, baseScore - 1 + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
      {
        id: `${subject}-analytical`,
        name: 'Analytical Thinking',
        description: 'Breaking down complex problems into simpler components',
        score: Math.max(1, Math.min(10, baseScore + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
    ];
  }
  
  if (subject === 'biology') {
    subjectSkills = [
      {
        id: `${subject}-concepts`,
        name: 'Conceptual Clarity',
        description: 'Understanding of fundamental biological concepts',
        score: Math.max(1, Math.min(10, baseScore + 1 + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
      {
        id: `${subject}-application`,
        name: 'Application to New Situations',
        description: 'Applying concepts to novel scenarios and case studies',
        score: Math.max(1, Math.min(10, baseScore + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
      {
        id: `${subject}-pattern`,
        name: 'Pattern Recognition',
        description: 'Identifying patterns in biological systems and processes',
        score: Math.max(1, Math.min(10, baseScore - 1 + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
      {
        id: `${subject}-numerical`,
        name: 'Numerical Proficiency',
        description: 'Ability to work with biological data and calculations',
        score: Math.max(1, Math.min(10, baseScore + randomOffset())),
        idealScore: baseIdealScore,
        subject,
      },
    ];
  }

  return [...commonSkills, ...subjectSkills];
};

// Generate some topics per subject
const generateTopics = (subject: Subject) => {
  const topicsMap = {
    physics: ['Kinematics', 'Electrostatics', 'Optics', 'Thermodynamics', 'Modern Physics', 'Wave Optics'],
    chemistry: ['Electrochemistry', 'Organic Chemistry', 'Chemical Bonding', 'Thermodynamics', 'Coordination Compounds'],
    mathematics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Trigonometry', 'Vectors', 'Probability'],
    biology: ['Cell Biology', 'Genetics', 'Human Physiology', 'Plant Physiology', 'Ecology', 'Molecular Biology']
  };

  const topics = topicsMap[subject];
  
  // Create strong topics
  const strongTopics = topics.slice(0, 2).map((name, index) => ({
    id: `${subject}-strong-${index}`,
    name,
    subject,
    accuracy: 80 + Math.floor(Math.random() * 20),
    lastTestedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
  
  // Create weak topics
  const weakTopics = topics.slice(2, 4).map((name, index) => ({
    id: `${subject}-weak-${index}`,
    name,
    subject,
    accuracy: 40 + Math.floor(Math.random() * 30),
    lastTestedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
  
  return { strongTopics, weakTopics };
};

// Generate mock tests
const generateMockTests = (count = 5) => {
  const tests = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (i * 7)); // One test per week
    
    const baseScore = 50 + Math.floor(Math.random() * 30) + i * 3; // Gradually improving scores
    
    tests.push({
      id: `mock-${i}`,
      date: date.toISOString().split('T')[0],
      score: baseScore,
      percentile: Math.min(99, 60 + Math.floor(Math.random() * 30) + i * 2),
      subjectScores: {
        physics: baseScore - 5 + Math.floor(Math.random() * 10),
        chemistry: baseScore - 3 + Math.floor(Math.random() * 8),
        mathematics: baseScore + Math.floor(Math.random() * 12),
        biology: baseScore - 2 + Math.floor(Math.random() * 6)
      },
      duration: 180 // 3 hours
    });
  }
  
  return tests;
};

// Generate daily practice records
const generateDailyPractice = (count = 10) => {
  const practice = [];
  const subjects: Subject[] = ['physics', 'chemistry', 'mathematics', 'biology'];
  const topicsMap = {
    physics: ['Kinematics', 'Electrostatics', 'Optics', 'Thermodynamics', 'Modern Physics'],
    chemistry: ['Electrochemistry', 'Organic Chemistry', 'Chemical Bonding', 'Thermodynamics'],
    mathematics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Trigonometry', 'Vectors'],
    biology: ['Cell Biology', 'Genetics', 'Human Physiology', 'Plant Physiology', 'Ecology']
  };
  
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const topics = topicsMap[subject];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    const questionsAttempted = 10 + Math.floor(Math.random() * 15);
    const questionsCorrect = Math.floor(questionsAttempted * (0.6 + Math.random() * 0.3));
    
    practice.push({
      id: `dp-${i}`,
      date: date.toISOString().split('T')[0],
      topic,
      subject,
      questionsAttempted,
      questionsCorrect,
      timeSpent: 20 + Math.floor(Math.random() * 40)
    });
  }
  
  return practice;
};

// Generate tutor notes
const generateTutorNotes = (count = 3) => {
  const notes = [];
  const contents = [
    'Needs to focus more on problem-solving in Physics',
    'Showing great improvement in Organic Chemistry',
    'Still struggling with Calculus integration',
    'Good participation in class today',
    'Missing some fundamentals in Chemical Bonding',
    'Excellent work on the last assignment'
  ];
  
  const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 2);
    
    notes.push({
      id: `note-${i}`,
      date: date.toISOString().split('T')[0],
      content: contents[Math.floor(Math.random() * contents.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)]
    });
  }
  
  return notes;
};

// Create mock students
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Arjun Sharma',
    profileImage: '/placeholder.svg',
    grade: '12th',
    targetExam: 'JEE',
    targetYear: 2025,
    skills: [
      ...generateSkillScores('physics', 7),
      ...generateSkillScores('chemistry', 6),
      ...generateSkillScores('mathematics', 8)
    ],
    weakTopics: [
      ...generateTopics('physics').weakTopics,
      ...generateTopics('chemistry').weakTopics,
      ...generateTopics('mathematics').weakTopics
    ],
    strongTopics: [
      ...generateTopics('physics').strongTopics,
      ...generateTopics('chemistry').strongTopics,
      ...generateTopics('mathematics').strongTopics
    ],
    mockTests: generateMockTests(),
    dailyPractice: generateDailyPractice(),
    attendance: {
      present: 42,
      total: 45
    },
    tutorNotes: generateTutorNotes()
  },
  {
    id: 'student-2',
    name: 'Priya Patel',
    profileImage: '/placeholder.svg',
    grade: '12th',
    targetExam: 'NEET',
    targetYear: 2025,
    skills: [
      ...generateSkillScores('physics', 5),
      ...generateSkillScores('chemistry', 7),
      ...generateSkillScores('biology', 8)
    ],
    weakTopics: [
      ...generateTopics('physics').weakTopics,
      ...generateTopics('chemistry').weakTopics,
      ...generateTopics('biology').weakTopics
    ],
    strongTopics: [
      ...generateTopics('physics').strongTopics,
      ...generateTopics('chemistry').strongTopics,
      ...generateTopics('biology').strongTopics
    ],
    mockTests: generateMockTests(),
    dailyPractice: generateDailyPractice(),
    attendance: {
      present: 44,
      total: 45
    },
    tutorNotes: generateTutorNotes()
  },
  {
    id: 'student-3',
    name: 'Rahul Verma',
    profileImage: '/placeholder.svg',
    grade: '11th',
    targetExam: 'JEE',
    targetYear: 2026,
    skills: [
      ...generateSkillScores('physics', 4),
      ...generateSkillScores('chemistry', 5),
      ...generateSkillScores('mathematics', 7)
    ],
    weakTopics: [
      ...generateTopics('physics').weakTopics,
      ...generateTopics('chemistry').weakTopics,
      ...generateTopics('mathematics').weakTopics
    ],
    strongTopics: [
      ...generateTopics('physics').strongTopics,
      ...generateTopics('chemistry').strongTopics,
      ...generateTopics('mathematics').strongTopics
    ],
    mockTests: generateMockTests(3),
    dailyPractice: generateDailyPractice(),
    attendance: {
      present: 40,
      total: 45
    },
    tutorNotes: generateTutorNotes(4)
  }
];

// Get a student by ID
export const getStudentById = (id: string): Student | undefined => {
  return mockStudents.find(student => student.id === id);
};
