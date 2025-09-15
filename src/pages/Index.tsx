import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { Leaf, BookOpen, Users, Award, Globe, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4 safe-area-top">
      <div className="w-full max-w-md text-center space-y-8 animate-slide-up">
        {/* Logo and Branding */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-eco rounded-full animate-float shadow-eco">
              <Leaf className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold bg-gradient-eco bg-clip-text text-transparent">
                EcoLearn
              </h1>
              <p className="text-sm text-muted-foreground">Learn • Play • Save Planet</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Gamified Environmental Education
            </h2>
            <p className="text-muted-foreground">
              Join thousands of students learning to protect our planet through interactive lessons and real-world challenges.
            </p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center">
          <LanguageToggle 
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 py-6">
          <div className="bg-card/50 p-4 rounded-lg border border-border/50 card-hover">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2 animate-bounce-gentle" />
            <p className="text-sm font-medium">Interactive Lessons</p>
          </div>
          <div className="bg-card/50 p-4 rounded-lg border border-border/50 card-hover">
            <Users className="h-8 w-8 text-secondary mx-auto mb-2 animate-bounce-gentle" />
            <p className="text-sm font-medium">Real Challenges</p>
          </div>
          <div className="bg-card/50 p-4 rounded-lg border border-border/50 card-hover">
            <Award className="h-8 w-8 text-accent mx-auto mb-2 animate-bounce-gentle" />
            <p className="text-sm font-medium">Earn Rewards</p>
          </div>
          <div className="bg-card/50 p-4 rounded-lg border border-border/50 card-hover">
            <Globe className="h-8 w-8 text-success mx-auto mb-2 animate-bounce-gentle" />
            <p className="text-sm font-medium">Global Impact</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/login')}
            variant="eco" 
            size="xl" 
            className="w-full"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Learning Now
          </Button>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="secondary" 
              size="lg" 
              className="flex-1"
            >
              Student Demo
            </Button>
            <Button 
              onClick={() => navigate('/teacher/dashboard')}
              variant="outline" 
              size="lg" 
              className="flex-1"
            >
              Teacher Demo
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Perfect for grades 6-12 & colleges</p>
          <p>Works offline • Syncs when online</p>
          <p>Available in English & Hindi</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
