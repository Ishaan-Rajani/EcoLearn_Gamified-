import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/')}
      variant="ghost"
      size="sm"
      className="fixed top-4 left-4 z-50 bg-white/30 backdrop-blur-sm border border-border/30 shadow-sm hover:bg-white/50 p-2"
    >
      <Home className="h-4 w-4" />
    </Button>
  );
};