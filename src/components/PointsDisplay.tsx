import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  change?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({
  points,
  change,
  label = 'Eco Points',
  size = 'md',
  animated = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl font-display',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-center gap-1 ${animated ? 'animate-float' : ''}`}>
        <Sparkles className={`${iconSizes[size]} text-accent animate-glow`} />
        <div className="flex flex-col">
          <span className={`font-bold ${sizeClasses[size]} bg-gradient-reward bg-clip-text text-transparent`}>
            {points.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
      
      {change !== undefined && change !== 0 && (
        <div className={`flex items-center gap-1 ${change > 0 ? 'text-success' : 'text-destructive'}`}>
          <TrendingUp className={`${iconSizes.sm} ${change > 0 ? 'rotate-0' : 'rotate-180'}`} />
          <span className="text-sm font-medium">
            {change > 0 ? '+' : ''}{change}
          </span>
        </div>
      )}
    </div>
  );
};