import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HomeButton } from '@/components/HomeButton';
import { FeatureInfoModal } from '@/components/FeatureInfoModal';
import { useLanguage } from '@/hooks/useLanguage';
import { useViewMode } from '@/hooks/useViewMode';
import studentsLearning from '@/assets/students-learning.jpg';
import ecoElements from '@/assets/eco-elements.jpg';
import { Leaf, BookOpen, Users, Award, Globe, Sparkles, Monitor, Smartphone } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { viewMode } = useViewMode();
  const [selectedFeature, setSelectedFeature] = useState<'lessons' | 'challenges' | 'rewards' | 'impact' | null>(null);

  // Feature card component
  const FeatureCard = ({ 
    feature, 
    icon: Icon, 
    title, 
    className = "",
    onClick 
  }: { 
    feature: 'lessons' | 'challenges' | 'rewards' | 'impact';
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    className?: string;
    onClick: () => void;
  }) => {
    // Define colors for each feature to match desktop mode
    const getFeatureColor = (feature: string) => {
      switch (feature) {
        case 'lessons': return 'text-primary';
        case 'challenges': return 'text-secondary';
        case 'rewards': return 'text-accent';
        case 'impact': return 'text-success';
        default: return 'text-primary';
      }
    };

    return (
      <div 
        onClick={onClick}
        className={`bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 card-hover relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      >
        <div className="relative z-10">
          <Icon className={`h-8 w-8 ${getFeatureColor(feature)} mx-auto mb-2 animate-bounce-gentle`} />
          <p className="text-sm font-medium text-center">{title}</p>
          <p className="text-xs text-muted-foreground text-center mt-1">{t('clickToLearnMore')}</p>
        </div>
      </div>
    );
  };

  // Mobile layout
  const MobileLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4 safe-area-top relative overflow-hidden">
      {/* Background illustration */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${studentsLearning})` }}
      />
      
      <div className="w-full max-w-md text-center space-y-8 animate-slide-up relative z-10">
        {/* Logo and Branding */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-eco rounded-full animate-float shadow-eco">
              <Leaf className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold bg-gradient-eco bg-clip-text text-transparent">
                {t('ecoLearn')}
              </h1>
              <p className="text-sm text-muted-foreground">{t('learnPlaySave')}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              {t('gamifiedEducation')}
            </h2>
            <p className="text-muted-foreground">
              {t('mainDescription')}
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

        {/* Features Grid with illustrations */}
        <div className="grid grid-cols-2 gap-4 py-6">
          <FeatureCard
            feature="lessons"
            icon={BookOpen}
            title={t('interactiveLessons')}
            className="relative overflow-hidden"
            onClick={() => setSelectedFeature('lessons')}
          />
          <FeatureCard
            feature="challenges"
            icon={Users}
            title={t('realChallenges')}
            onClick={() => setSelectedFeature('challenges')}
          />
          <FeatureCard
            feature="rewards"
            icon={Award}
            title={t('earnRewards')}
            onClick={() => setSelectedFeature('rewards')}
          />
          <FeatureCard
            feature="impact"
            icon={Globe}
            title={t('globalImpact')}
            onClick={() => setSelectedFeature('impact')}
          />
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
            {t('startLearningNow')}
          </Button>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="secondary" 
              size="lg" 
              className="flex-1"
            >
              {t('studentDemo')}
            </Button>
            <Button 
              onClick={() => navigate('/teacher/dashboard')}
              variant="outline" 
              size="lg" 
              className="flex-1"
            >
              {t('teacherDemo')}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>{t('perfectForGrades')}</p>
          <p>{t('worksOffline')}</p>
          <p>{t('availableInLanguages')}</p>
        </div>
      </div>
    </div>
  );

  // Desktop layout
  const DesktopLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="container-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Logo and Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-6 bg-gradient-eco rounded-full animate-float shadow-eco">
                  <Leaf className="h-16 w-16 text-white" />
                </div>
                <div>
                  <h1 className="text-6xl font-display font-bold bg-gradient-eco bg-clip-text text-transparent">
                    {t('ecoLearn')}
                  </h1>
                  <p className="text-lg text-muted-foreground">{t('learnPlaySave')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-display font-semibold text-foreground">
                  {t('gamifiedEducation')}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('mainDescription')} {t('perfectForGrades')}
                </p>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex justify-start">
              <LanguageToggle 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/login')}
                variant="eco" 
                size="xl" 
                className="px-8 py-6 text-lg"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                {t('startLearningNow')}
              </Button>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="secondary" 
                  size="lg" 
                  className="px-6 py-4"
                >
                  {t('studentDemo')}
                </Button>
                <Button 
                  onClick={() => navigate('/teacher/dashboard')}
                  variant="outline" 
                  size="lg" 
                  className="px-6 py-4"
                >
                  {t('teacherDemo')}
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div 
              className="desktop-card p-6 card-hover relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedFeature('lessons')}
            >
              <div 
                className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${ecoElements})` }}
              />
              <div className="relative z-10">
                <BookOpen className="h-12 w-12 text-primary mb-4 animate-bounce-gentle" />
                <h3 className="text-lg font-semibold mb-2">{t('interactiveLessons')}</h3>
                <p className="text-sm text-muted-foreground mb-2">Engaging content that makes learning fun</p>
                <p className="text-xs text-muted-foreground">{t('clickToLearnMore')}</p>
              </div>
            </div>
            <div 
              className="desktop-card p-6 card-hover cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedFeature('challenges')}
            >
              <Users className="h-12 w-12 text-secondary mb-4 animate-bounce-gentle" />
              <h3 className="text-lg font-semibold mb-2">{t('realChallenges')}</h3>
              <p className="text-sm text-muted-foreground mb-2">Apply knowledge in real-world scenarios</p>
              <p className="text-xs text-muted-foreground">{t('clickToLearnMore')}</p>
            </div>
            <div 
              className="desktop-card p-6 card-hover cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedFeature('rewards')}
            >
              <Award className="h-12 w-12 text-accent mb-4 animate-bounce-gentle" />
              <h3 className="text-lg font-semibold mb-2">{t('earnRewards')}</h3>
              <p className="text-sm text-muted-foreground mb-2">Get points and badges for achievements</p>
              <p className="text-xs text-muted-foreground">{t('clickToLearnMore')}</p>
            </div>
            <div 
              className="desktop-card p-6 card-hover cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedFeature('impact')}
            >
              <Globe className="h-12 w-12 text-success mb-4 animate-bounce-gentle" />
              <h3 className="text-lg font-semibold mb-2">{t('globalImpact')}</h3>
              <p className="text-sm text-muted-foreground mb-2">Make a difference for our planet</p>
              <p className="text-xs text-muted-foreground">{t('clickToLearnMore')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-muted-foreground space-y-2">
          <p className="text-lg">{t('worksOffline')}</p>
          <p className="text-lg">{t('availableInLanguages')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={viewMode === 'mobile' ? 'view-mobile' : 'view-desktop'}>
        {viewMode === 'mobile' ? <MobileLayout /> : <DesktopLayout />}
      </div>
      <FeatureInfoModal 
        isOpen={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature}
      />
    </>
  );
};

export default Index;

