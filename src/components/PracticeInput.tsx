
import React, { useState } from 'react';
import { Subject } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface PracticeInputProps {
  studentId: string;
}

const PracticeInput: React.FC<PracticeInputProps> = ({ studentId }) => {
  const [subject, setSubject] = useState<Subject>('physics');
  const [topic, setTopic] = useState('');
  const [questionsAttempted, setQuestionsAttempted] = useState('');
  const [questionsCorrect, setQuestionsCorrect] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  
  const subjectTopicsMap = {
    physics: ['Kinematics', 'Electrostatics', 'Optics', 'Thermodynamics', 'Modern Physics', 'Wave Optics'],
    chemistry: ['Electrochemistry', 'Organic Chemistry', 'Chemical Bonding', 'Thermodynamics', 'Coordination Compounds'],
    mathematics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Trigonometry', 'Vectors', 'Probability'],
    biology: ['Cell Biology', 'Genetics', 'Human Physiology', 'Plant Physiology', 'Ecology', 'Molecular Biology']
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!topic || !questionsAttempted || !questionsCorrect || !timeSpent) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const attempted = parseInt(questionsAttempted);
    const correct = parseInt(questionsCorrect);
    
    if (isNaN(attempted) || isNaN(correct) || isNaN(parseInt(timeSpent))) {
      toast({
        title: "Invalid input",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    if (correct > attempted) {
      toast({
        title: "Invalid input",
        description: "Correct answers cannot be more than attempted questions",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would send this data to an API
    toast({
      title: "Practice data saved",
      description: `Added practice data for ${topic}`,
    });
    
    // Reset form
    setTopic('');
    setQuestionsAttempted('');
    setQuestionsCorrect('');
    setTimeSpent('');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Add Daily Practice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={subject}
                onValueChange={(value) => setSubject(value as Subject)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select
                value={topic}
                onValueChange={setTopic}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {subjectTopicsMap[subject].map((topic) => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="questionsAttempted">Questions Attempted</Label>
              <Input
                id="questionsAttempted"
                type="number"
                min="1"
                value={questionsAttempted}
                onChange={(e) => setQuestionsAttempted(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="questionsCorrect">Questions Correct</Label>
              <Input
                id="questionsCorrect"
                type="number"
                min="0"
                max={questionsAttempted || undefined}
                value={questionsCorrect}
                onChange={(e) => setQuestionsCorrect(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSpent">Time Spent (minutes)</Label>
              <Input
                id="timeSpent"
                type="number"
                min="1"
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Save Practice Data</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PracticeInput;
