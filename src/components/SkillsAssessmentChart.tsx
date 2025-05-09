
import React from 'react';
import { Skill, Subject } from '@/types';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';

interface SkillsAssessmentChartProps {
  skills: Skill[];
  subject?: Subject;
}

const SkillsAssessmentChart: React.FC<SkillsAssessmentChartProps> = ({ skills, subject }) => {
  const filteredSkills = subject 
    ? skills.filter(skill => skill.subject === subject) 
    : skills;
  
  // Transform skills data for the chart
  const chartData = filteredSkills.map(skill => ({
    name: skill.name,
    studentScore: skill.score,
    idealScore: skill.idealScore,
    description: skill.description,
  }));

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            tick={{ fontSize: 12 }}
            interval={0}
            height={60}
          />
          <YAxis 
            domain={[0, 10]} 
            ticks={[0, 2, 4, 6, 8, 10]}
            label={{ value: 'Score', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} 
          />
          <Tooltip 
            formatter={(value: number, name: string, props: any) => {
              const displayName = name === 'studentScore' ? 'Student Score' : 'Ideal Score';
              return [`${displayName}: ${value}/10`, props.payload.description];
            }}
            labelFormatter={(label) => `Skill: ${label}`}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => value === 'studentScore' ? 'Your Skills' : 'Ideal Topper'}
          />
          <Line 
            type="monotone" 
            dataKey="studentScore" 
            stroke="#8884d8" 
            strokeWidth={2} 
            activeDot={{ r: 8 }} 
            name="studentScore"
          />
          <Line 
            type="monotone" 
            dataKey="idealScore" 
            stroke="#82ca9d" 
            strokeDasharray="5 5" 
            strokeWidth={2}
            name="idealScore" 
          />
          <ReferenceLine y={5} stroke="red" strokeDasharray="3 3" label="Average" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsAssessmentChart;
