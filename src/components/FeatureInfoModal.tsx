import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useViewMode } from '@/hooks/useViewMode';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  BookOpen, 
  Users, 
  Award, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap,
  Target,
  Trophy,
  Leaf,
  Heart,
  X
} from 'lucide-react';

interface FeatureInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: 'lessons' | 'challenges' | 'rewards' | 'impact' | null;
}

const getFeatureData = (t: (key: string) => string) => ({
  lessons: {
    title: t('interactiveLessons'),
    icon: BookOpen,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: t('lessonsDescription'),
    flowchart: [
      { step: t('startLearning'), icon: BookOpen, color: 'bg-primary' },
      { step: t('watchVideos'), icon: '▶️', color: 'bg-blue-500' },
      { step: t('takeQuizzes'), icon: '❓', color: 'bg-yellow-500' },
      { step: t('completeActivities'), icon: '🎯', color: 'bg-green-500' },
      { step: t('earnPoints'), icon: '⭐', color: 'bg-purple-500' }
    ],
    features: [
      '🎥 Animated video lessons with real-world examples',
      '🧠 Interactive quizzes with instant feedback',
      '🎮 Gamified learning activities and simulations',
      '📊 Progress tracking and personalized recommendations',
      '🌍 Content available in multiple languages',
      '📱 Works offline - sync when online'
    ],
    benefits: [
      'Makes complex topics easy to understand',
      'Keeps students engaged and motivated',
      'Adapts to individual learning pace',
      'Builds critical thinking skills'
    ]
  },
  challenges: {
    title: t('realChallenges'),
    icon: Users,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    description: t('challengesDescription'),
    flowchart: [
      { step: t('joinChallenge'), icon: Target, color: 'bg-secondary' },
      { step: t('planAction'), icon: '📋', color: 'bg-orange-500' },
      { step: t('takeAction'), icon: '🌱', color: 'bg-green-500' },
      { step: t('documentResults'), icon: '📸', color: 'bg-blue-500' },
      { step: t('shareImpact'), icon: '📢', color: 'bg-purple-500' }
    ],
    features: [
      '🌱 Weekly environmental challenges and projects',
      '👥 Team challenges to build collaboration skills',
      '📱 Photo and video documentation tools',
      '🏆 Leaderboards and recognition systems',
      '🌍 Global challenges connecting students worldwide',
      '📊 Real-time impact tracking and analytics'
    ],
    benefits: [
      'Bridges classroom learning with real-world action',
      'Develops leadership and teamwork skills',
      'Creates measurable environmental impact',
      'Builds confidence through hands-on experience'
    ]
  },
  rewards: {
    title: t('earnRewards'),
    icon: Award,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    description: t('rewardsDescription'),
    flowchart: [
      { step: t('completeTasks'), icon: CheckCircle, color: 'bg-accent' },
      { step: t('earnPoints'), icon: '⭐', color: 'bg-yellow-500' },
      { step: t('unlockBadges'), icon: '🏅', color: 'bg-orange-500' },
      { step: t('levelUp'), icon: '⬆️', color: 'bg-green-500' },
      { step: t('getPrizes'), icon: Trophy, color: 'bg-purple-500' }
    ],
    features: [
      '⭐ Point system for every completed lesson and challenge',
      '🏅 50+ unique badges for different achievements',
      '🎖️ Special recognition for environmental impact',
      '🎁 Real prizes: eco-friendly products and experiences',
      '👑 Monthly leaderboards with exclusive rewards',
      '🎓 Certificates for course completions'
    ],
    benefits: [
      'Motivates continuous learning and engagement',
      'Recognizes both individual and team achievements',
      'Creates healthy competition among students',
      'Builds long-term environmental commitment'
    ]
  },
  impact: {
    title: t('globalImpact'),
    icon: Globe,
    color: 'text-success',
    bgColor: 'bg-success/10',
    description: t('impactDescription'),
    flowchart: [
      { step: t('yourAction'), icon: Heart, color: 'bg-success' },
      { step: t('localImpact'), icon: '🏘️', color: 'bg-blue-500' },
      { step: t('regionalChange'), icon: '🌍', color: 'bg-green-500' },
      { step: t('globalMovement'), icon: '🌎', color: 'bg-purple-500' },
      { step: t('planetSaved'), icon: Leaf, color: 'bg-emerald-500' }
    ],
    features: [
      '📊 Real-time impact dashboard showing your contributions',
      '🌍 Global map showing worldwide student actions',
      '📈 CO2 reduction, waste saved, and energy conserved tracking',
      '🤝 Partner with environmental organizations',
      '📰 Monthly impact reports and success stories',
      '🎯 Set and track personal environmental goals'
    ],
    benefits: [
      'Shows students their actions make a real difference',
      'Creates sense of global community and purpose',
      'Encourages long-term environmental commitment',
      'Provides data-driven motivation and feedback'
    ]
  }
});

export const FeatureInfoModal: React.FC<FeatureInfoModalProps> = ({ isOpen, onClose, feature }) => {
  const { viewMode } = useViewMode();
  const { t } = useLanguage();
  
  if (!feature) return null;

  const data = getFeatureData(t)[feature];
  const IconComponent = data.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${viewMode === 'mobile' ? 'max-w-md mx-4' : 'max-w-4xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <div className={`flex items-center gap-3 ${viewMode === 'mobile' ? 'flex-col text-center' : ''}`}>
            <div className={`p-3 rounded-full ${data.bgColor}`}>
              <IconComponent className={`${viewMode === 'mobile' ? 'h-6 w-6' : 'h-8 w-8'} ${data.color}`} />
            </div>
            <div>
              <DialogTitle className={`${viewMode === 'mobile' ? 'text-xl' : 'text-2xl'} font-bold`}>{data.title}</DialogTitle>
              <p className={`text-muted-foreground ${viewMode === 'mobile' ? 'text-sm' : ''}`}>{data.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Flowchart */}
          <Card className={`p-${viewMode === 'mobile' ? '4' : '6'}`}>
            <h3 className={`${viewMode === 'mobile' ? 'text-base' : 'text-lg'} font-semibold mb-4 flex items-center gap-2`}>
              <Zap className="h-4 w-4 text-accent" />
              {t('howItWorks')}
            </h3>
            <div className={`flex ${viewMode === 'mobile' ? 'flex-col gap-3' : 'flex-wrap items-center justify-center gap-4'}`}>
              {data.flowchart.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={`flex ${viewMode === 'mobile' ? 'items-center gap-3' : 'flex-col items-center space-y-2'} animate-bounce-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`${viewMode === 'mobile' ? 'w-8 h-8' : 'w-12 h-12'} rounded-full ${item.color} flex items-center justify-center text-white font-bold ${viewMode === 'mobile' ? 'text-sm' : 'text-lg'} shadow-md`}>
                      {typeof item.icon === 'string' ? item.icon : <item.icon className={`${viewMode === 'mobile' ? 'h-4 w-4' : 'h-6 w-6'}`} />}
                    </div>
                    <span className={`${viewMode === 'mobile' ? 'text-sm' : 'text-sm'} font-medium ${viewMode === 'mobile' ? '' : 'text-center max-w-20'}`}>{item.step}</span>
                  </div>
                  {index < data.flowchart.length - 1 && (
                    <div className={`${viewMode === 'mobile' ? 'hidden' : 'block'}`}>
                      <ArrowRight className="h-6 w-6 text-muted-foreground animate-float-gentle" style={{ animationDelay: `${index * 0.1 + 0.2}s` }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Card>

          {/* Features */}
          <Card className={`p-${viewMode === 'mobile' ? '4' : '6'}`}>
            <h3 className={`${viewMode === 'mobile' ? 'text-base' : 'text-lg'} font-semibold mb-4 flex items-center gap-2`}>
              <Star className="h-4 w-4 text-accent" />
              {t('whatYouGet')}
            </h3>
            <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-3`}>
              {data.features.map((feature, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200 animate-slide-up ${viewMode === 'mobile' ? 'text-sm' : ''}`} style={{ animationDelay: `${index * 0.05}s` }}>
                  <CheckCircle className={`${viewMode === 'mobile' ? 'h-4 w-4' : 'h-5 w-5'} text-success mt-0.5 flex-shrink-0`} />
                  <span className={`${viewMode === 'mobile' ? 'text-xs' : 'text-sm'}`}>{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Benefits */}
          <Card className={`p-${viewMode === 'mobile' ? '4' : '6'}`}>
            <h3 className={`${viewMode === 'mobile' ? 'text-base' : 'text-lg'} font-semibold mb-4 flex items-center gap-2`}>
              <Trophy className="h-4 w-4 text-accent" />
              {t('whyItMatters')}
            </h3>
            <div className="space-y-2">
              {data.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`${viewMode === 'mobile' ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-primary flex-shrink-0 animate-pulse-eco`} />
                  <span className={`${viewMode === 'mobile' ? 'text-xs' : 'text-sm'}`}>{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Call to Action */}
          <div className="flex justify-center pt-4">
            <Button onClick={onClose} size={viewMode === 'mobile' ? 'default' : 'lg'} className={`${viewMode === 'mobile' ? 'px-6' : 'px-8'}`}>
              {t('gotItLetsStart')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
