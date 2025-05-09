
import React from 'react';
import { Skill, Subject } from '@/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SkillsBarChartProps {
  skills: Skill[];
  subject?: Subject;
  height?: number;
  title?: string;
}

const SkillsBarChart: React.FC<SkillsBarChartProps> = ({ skills, subject, height = 300, title }) => {
  const filteredSkills = subject 
    ? skills.filter(skill => skill.subject === subject) 
    : skills;
  
  const data = {
    labels: filteredSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Student Score',
        data: filteredSkills.map(skill => skill.score),
        backgroundColor: 'rgba(155, 135, 245, 0.7)',
        borderColor: 'rgba(155, 135, 245, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Ideal Score',
        data: filteredSkills.map(skill => skill.idealScore),
        backgroundColor: 'rgba(110, 89, 165, 0.4)',
        borderColor: 'rgba(110, 89, 165, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2
        }
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    plugins: {
      title: {
        display: !!title,
        text: title || '',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const index = context.dataIndex;
            const datasetIndex = context.datasetIndex;
            const label = datasetIndex === 0 ? 'Student Score' : 'Ideal Score';
            const skillName = filteredSkills[index]?.name || '';
            const skillDesc = filteredSkills[index]?.description || '';
            
            return [`${label}: ${value}/10`, `${skillName}: ${skillDesc}`];
          },
        },
      },
    },
  };

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <Bar data={data} options={options as any} />
    </div>
  );
};

export default SkillsBarChart;
