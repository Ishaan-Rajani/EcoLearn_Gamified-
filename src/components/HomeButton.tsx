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
      className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm border border-border/50 shadow-sm hover:bg-white/90"
    >
      <Home className="h-4 w-4 mr-2" />
      Home
    </Button>
  );
};