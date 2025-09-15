import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Leaf, Star } from 'lucide-react';

interface EcoProgressProps {
  current: number;
  max: number;
  label?: string;
  showPoints?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

export const EcoProgress: React.FC<EcoProgressProps> = ({
  current,
  max,
  label,
  showPoints = true,
  variant = 'default',
  className = '',
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Leaf className="h-4 w-4 text-primary animate-pulse-eco" />
        <Progress value={percentage} className="flex-1 h-2" />
        {showPoints && (
          <span className="text-sm font-semibold text-points">
            {current.toLocaleString()}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-accent animate-bounce-gentle" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
          {showPoints && (
            <span className="text-sm font-bold text-points">
              {current.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <Progress 
        value={percentage} 
        className="h-3"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{percentage.toFixed(1)}% Complete</span>
        <span>{(max - current).toLocaleString()} to go</span>
      </div>
    </div>
  );
};