import React from 'react';
import { Badge } from '@/types';
import { Award, Lock } from 'lucide-react';

interface BadgeDisplayProps {
  badge: Badge | null;
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  className?: string;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badge,
  locked = false,
  size = 'md',
  showDescription = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const getBadgeColor = (type: Badge['type']) => {
    switch (type) {
      case 'bronze':
        return 'text-badge-bronze bg-badge-bronze/10';
      case 'silver':
        return 'text-badge-silver bg-badge-silver/10';
      case 'gold':
        return 'text-badge-gold bg-badge-gold/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (locked || !badge) {
    return (
      <div className={`flex flex-col items-center gap-1 ${className}`}>
        <div className={`${sizeClasses[size]} rounded-full bg-muted flex items-center justify-center opacity-50`}>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
        {showDescription && (
          <span className="text-xs text-muted-foreground text-center">Locked</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${getBadgeColor(badge.type)} animate-glow`}>
        <Award className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'}`} />
      </div>
      {showDescription && (
        <div className="text-center">
          <p className="text-xs font-medium text-foreground">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>
      )}
    </div>
  );
};