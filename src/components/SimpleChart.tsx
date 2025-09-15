import React from 'react';

interface SimpleChartProps {
  data: { label: string; value: number; color?: string }[];
  type?: 'bar' | 'line';
  height?: number;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({ 
  data, 
  type = 'bar', 
  height = 120 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
            <div className="w-full bg-progress-bg rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  item.color || 'bg-progress-fill'
                }`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Simple line chart using CSS
  if (type === 'line') {
    return (
      <div className="relative" style={{ height }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 120"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="30" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 24"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Line path */}
          <path
            d={`M ${data.map((item, index) => 
              `${(index / (data.length - 1)) * 280 + 10},${120 - (item.value / maxValue) * 100}`
            ).join(' L ')}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            className="drop-shadow-sm"
          />

          {/* Data points */}
          {data.map((item, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 280 + 10}
              cy={120 - (item.value / maxValue) * 100}
              r="3"
              fill="hsl(var(--primary))"
              className="drop-shadow-sm"
            />
          ))}
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground mt-2">
          {data.map((item, index) => (
            <span key={index} className="text-center">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
};