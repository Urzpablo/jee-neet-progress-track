
import React from 'react';
import { MockTest } from '@/types';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

interface ProgressChartProps {
  mockTests: MockTest[];
  height?: number;
  title?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ mockTests, height = 300, title }) => {
  // Sort tests by date
  const sortedTests = [...mockTests].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const data = {
    labels: sortedTests.map(test => {
      const date = new Date(test.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Overall Score',
        data: sortedTests.map(test => test.score),
        borderColor: 'rgba(155, 135, 245, 1)',
        backgroundColor: 'rgba(155, 135, 245, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Physics',
        data: sortedTests.map(test => test.subjectScores.physics || 0),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        hidden: true,
      },
      {
        label: 'Chemistry',
        data: sortedTests.map(test => test.subjectScores.chemistry || 0),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        hidden: true,
      },
      {
        label: 'Mathematics',
        data: sortedTests.map(test => test.subjectScores.mathematics || 0),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        hidden: true,
      },
      {
        label: 'Biology',
        data: sortedTests.map(test => test.subjectScores.biology || 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        hidden: true,
      },
    ].filter(dataset => {
      // Only include datasets that have data
      const hasData = dataset.data.some(value => value > 0);
      return hasData;
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
      },
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
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const datasetLabel = context.dataset.label || '';
            return `${datasetLabel}: ${value}/100`;
          },
        },
      },
    },
  };

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <Line data={data} options={options as any} />
    </div>
  );
};

export default ProgressChart;
