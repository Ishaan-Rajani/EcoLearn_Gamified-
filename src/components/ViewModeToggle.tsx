import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor } from 'lucide-react';
import { useViewMode } from '@/hooks/useViewMode';

export const ViewModeToggle: React.FC = () => {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <Button
      onClick={toggleViewMode}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-white/30 backdrop-blur-sm border border-border/30 shadow-sm hover:bg-white/50 p-2"
      title={`Switch to ${viewMode === 'mobile' ? 'Desktop' : 'Mobile'} view`}
    >
      {viewMode === 'mobile' ? (
        <Monitor className="h-4 w-4" />
      ) : (
        <Smartphone className="h-4 w-4" />
      )}
    </Button>
  );
};


