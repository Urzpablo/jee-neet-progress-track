
import React from 'react';
import { Skill, Subject } from '@/types';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register the required chart components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  skills: Skill[];
  subject?: Subject;
  height?: number;
  title?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ skills, subject, height = 300, title }) => {
  const filteredSkills = subject 
    ? skills.filter(skill => skill.subject === subject) 
    : skills;
  
  const data = {
    labels: filteredSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Student Score',
        data: filteredSkills.map(skill => skill.score),
        backgroundColor: 'rgba(155, 135, 245, 0.3)',
        borderColor: 'rgba(155, 135, 245, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ideal Score',
        data: filteredSkills.map(skill => skill.idealScore),
        backgroundColor: 'rgba(110, 89, 165, 0.1)',
        borderColor: 'rgba(110, 89, 165, 1)',
        borderWidth: 1,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
        },
        pointLabels: {
          font: {
            size: 10,
            weight: 'bold' as const,
          },
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
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
      <Radar data={data} options={options as any} />
    </div>
  );
};

export default RadarChart;
