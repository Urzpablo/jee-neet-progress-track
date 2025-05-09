
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, BarChart } from 'lucide-react';

type ViewType = 'radar' | 'chart';

interface ViewToggleProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={activeView === 'radar' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('radar')}
        aria-label="Radar view"
      >
        <LayoutGrid className="mr-1 h-4 w-4" />
        Radar
      </Button>
      <Button
        variant={activeView === 'chart' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('chart')}
        aria-label="Bar chart view"
      >
        <BarChart className="mr-1 h-4 w-4" />
        Chart
      </Button>
    </div>
  );
};

export default ViewToggle;
