import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/MobileNav';
import { EcoProgress } from '@/components/EcoProgress';
import { PointsDisplay } from '@/components/PointsDisplay';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Flame, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';

// Mock data
const mockUser = {
  name: "Arjun Patel",
  ecoPoints: 2480,
  level: 7,
  pointsChange: 120,
  weeklyGoal: 500,
  weeklyProgress: 340,
  streak: 5,
  badges: [
    { id: '1', name: 'Tree Planter', description: 'Planted 10 trees', icon: '🌱', type: 'gold' as const, earnedAt: new Date() },
    { id: '2', name: 'Water Saver', description: 'Completed water conservation', icon: '💧', type: 'silver' as const, earnedAt: new Date() },
  ]
};

const recentActivities = [
  { id: '1', action: 'Completed Renewable Energy Quiz', points: 50, time: '2 hours ago', icon: CheckCircle2 },
  { id: '2', action: 'Joined Tree Planting Challenge', points: 30, time: '1 day ago', icon: Target },
  { id: '3', action: 'Earned Water Conservation Badge', points: 100, time: '2 days ago', icon: Trophy },
];

export default function StudentDashboard() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      {/* Header */}
      <header className="bg-gradient-eco text-white p-4 rounded-b-2xl shadow-eco">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-display font-bold">
              {t('welcomeBack')}, {mockUser.name}! 👋
            </h1>
            <p className="text-white/80 text-sm">Ready to save the planet today?</p>
          </div>
          <LanguageToggle 
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>
        
        {/* Points and Level */}
        <div className="flex items-center justify-between">
          <PointsDisplay 
            points={mockUser.ecoPoints}
            change={mockUser.pointsChange}
            size="lg"
            className="text-white"
          />
          <div className="text-right">
            <div className="text-2xl font-bold">Level {mockUser.level}</div>
            <div className="text-white/80 text-sm">Eco Warrior</div>
          </div>
        </div>
      </header>

      <div className="container-mobile py-6 space-y-6">
        {/* Weekly Goal Progress */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              {t('weeklyProgress')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EcoProgress 
              current={mockUser.weeklyProgress}
              max={mockUser.weeklyGoal}
              label={t('todaysGoal')}
            />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-accent animate-glow" />
                <span className="text-2xl font-bold text-accent">{mockUser.streak}</span>
              </div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-badge-gold animate-bounce-gentle" />
                <span className="text-2xl font-bold text-badge-gold">{mockUser.badges.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Badges */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-accent" />
              Latest Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {mockUser.badges.map((badge) => (
                <BadgeDisplay 
                  key={badge.id}
                  badge={badge}
                  size="md"
                  showDescription
                />
              ))}
              <BadgeDisplay 
                locked 
                badge={null}
                size="md" 
                showDescription 
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="eco" size="lg" className="h-20 flex-col gap-2">
            <BookOpen className="h-6 w-6" />
            <span>{t('lessons')}</span>
          </Button>
          <Button variant="sky" size="lg" className="h-20 flex-col gap-2">
            <Target className="h-6 w-6" />
            <span>{t('challenges')}</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              {t('recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <activity.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="flex items-center gap-1 text-points font-semibold text-sm">
                  <TrendingUp className="h-3 w-3" />
                  +{activity.points}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <MobileNav />
    </div>
  );
}