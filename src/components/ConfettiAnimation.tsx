import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiAnimationProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ trigger, onComplete }) => {
  useEffect(() => {
    if (trigger) {
      // Eco-themed confetti with green colors
      const runConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#16a34a', '#15803d', '#fbbf24', '#f59e0b']
        });
        
        // Second burst
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.7 },
            colors: ['#3b82f6', '#06b6d4', '#10b981', '#84cc16']
          });
        }, 200);
      };

      runConfetti();
      
      // Call onComplete after animation
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  }, [trigger, onComplete]);

  return null;
};

// Celebration component for achievements
export const CelebrationEffect: React.FC<{ show: boolean }> = ({ show }) => {
  useEffect(() => {
    if (show) {
      // More dramatic celebration
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Eco-themed colors
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#16a34a', '#22c55e', '#4ade80', '#fbbf24', '#f59e0b']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#3b82f6', '#06b6d4', '#10b981', '#84cc16', '#eab308']
        });
      }, 250);
    }
  }, [show]);

  return null;
};