
import React from 'react';
import { Topic } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TopicsListProps {
  topics: Topic[];
  title: string;
  type: 'strong' | 'weak';
}

const TopicsList: React.FC<TopicsListProps> = ({ topics, title, type }) => {
  const statusColor = type === 'strong' ? 'bg-edu-green' : 'bg-edu-red';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.length === 0 ? (
          <p className="text-sm text-muted-foreground">No topics available</p>
        ) : (
          topics.map(topic => (
            <div key={topic.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`status-indicator ${statusColor}`} />
                  <span className="text-sm font-medium">{topic.name}</span>
                </div>
                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                  {topic.subject.charAt(0).toUpperCase() + topic.subject.slice(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Progress value={topic.accuracy} className="h-1 flex-1" />
                <span className="text-xs ml-2 text-muted-foreground w-10 text-right">
                  {topic.accuracy}%
                </span>
              </div>
              {topic.lastTestedDate && (
                <p className="text-xs text-muted-foreground">
                  Last tested: {topic.lastTestedDate}
                </p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TopicsList;
