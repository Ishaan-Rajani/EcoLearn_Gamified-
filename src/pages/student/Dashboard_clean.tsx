import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/MobileNav';
import { EcoProgress } from '@/components/EcoProgress';
import { PointsDisplay } from '@/components/PointsDisplay';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HomeButton } from '@/components/HomeButton';
import { QuizFlow } from '@/components/QuizFlow';
import { HelpTooltip } from '@/components/HelpTooltip';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useViewMode } from '@/hooks/useViewMode';
import studentsLearning from '@/assets/students-learning.jpg';
import ecoElements from '@/assets/eco-elements.jpg';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Flame, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  Play
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
  const { settings } = useAccessibility();
  const { viewMode } = useViewMode();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [userPoints, setUserPoints] = useState(mockUser.ecoPoints);
  const [userBadges, setUserBadges] = useState(mockUser.badges);

  const handleQuizComplete = (points: number, badge: any) => {
    setUserPoints(prev => prev + points);
    if (badge) {
      setUserBadges(prev => [...prev, badge]);
    }
    setShowQuiz(false);
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <QuizFlow 
            onComplete={handleQuizComplete}
            onClose={() => setShowQuiz(false)}
          />
        </div>
      </div>
    );
  }

  // Mobile Layout
  const MobileLayout = () => (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      <HomeButton />
      
      {/* Header with flat illustration */}
      <header className="bg-gradient-eco text-white p-4 rounded-b-2xl shadow-eco relative overflow-hidden">
        {/* Background illustration */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${studentsLearning})` }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-display font-bold">
                {t('welcomeBack')}, {mockUser.name}! 👋
              </h1>
              <p className="text-white/80 text-sm">Ready to save the planet today?</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAccessibility(!showAccessibility)}
                className="text-white hover:bg-white/20 border border-white/30 px-3 py-2 rounded-lg"
                title="Accessibility Settings"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <circle cx="12" cy="5" r="2"/>
                  <path d="M8 11h8"/>
                  <path d="M12 11v8"/>
                  <path d="M8 15l2 4"/>
                  <path d="M16 15l-2 4"/>
                </svg>
                Accessibility
              </Button>
              <LanguageToggle 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>
          </div>
          
          {/* Points and Level */}
          <div className="flex items-center justify-between">
            <PointsDisplay 
              points={userPoints}
              change={mockUser.pointsChange}
              size="lg"
              className="text-white"
            />
            <div className="text-right">
              <div className="text-2xl font-bold">Level {mockUser.level}</div>
              <div className="text-white/80 text-sm">Eco Warrior</div>
            </div>
          </div>
        </div>
      </header>

      {/* Accessibility Panel */}
      {showAccessibility && (
        <div className="container-mobile py-4">
          <AccessibilityToggle />
        </div>
      )}

      <div className="container-mobile py-6 space-y-6">
        {/* Weekly Goal Progress */}
        <HelpTooltip content="Track your weekly eco-points goal. Complete activities to earn points and fill this progress bar!">
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
        </HelpTooltip>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <HelpTooltip content="Your daily streak! Log in every day to keep it going and earn bonus points.">
            <Card className="card-hover">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className="h-5 w-5 text-accent animate-glow" />
                  <span className="text-2xl font-bold text-accent">{mockUser.streak}</span>
                </div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
          </HelpTooltip>
          
          <HelpTooltip content="Badges you've earned by completing eco-challenges and activities!">
            <Card className="card-hover">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-badge-gold animate-bounce-gentle" />
                  <span className="text-2xl font-bold text-badge-gold">{mockUser.badges.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </CardContent>
            </Card>
          </HelpTooltip>
        </div>

        {/* Recent Badges */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-badge-gold" />
              Recent Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BadgeDisplay badges={userBadges} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="eco" 
            size="lg" 
            className="h-20 flex-col gap-2"
            onClick={() => setShowQuiz(true)}
          >
            <Play className="h-6 w-6" />
            <span>Take Quiz</span>
          </Button>
          <Button variant="sky" size="lg" className="h-20 flex-col gap-2">
            <Target className="h-6 w-6" />
            <span>Challenges</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <activity.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-sm font-bold text-success">+{activity.points}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNav />
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="container-desktop py-8">
        {/* Header */}
        <div className="bg-gradient-eco text-white p-8 rounded-2xl shadow-eco relative overflow-hidden mb-8">
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${studentsLearning})` }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold">
                  {t('welcomeBack')}, {mockUser.name}! 👋
                </h1>
                <p className="text-white/80 text-lg">Ready to save the planet today?</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowAccessibility(!showAccessibility)}
                  className="text-white hover:bg-white/20 border border-white/30 px-6 py-3 rounded-lg"
                  title="Accessibility Settings"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="12" cy="5" r="2"/>
                    <path d="M8 11h8"/>
                    <path d="M12 11v8"/>
                    <path d="M8 15l2 4"/>
                    <path d="M16 15l-2 4"/>
                  </svg>
                  Accessibility
                </Button>
                <LanguageToggle 
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                />
              </div>
            </div>
            
            {/* Points and Level */}
            <div className="flex items-center justify-between">
              <PointsDisplay 
                points={userPoints}
                change={mockUser.pointsChange}
                size="xl"
                className="text-white"
              />
              <div className="text-right">
                <div className="text-4xl font-bold">Level {mockUser.level}</div>
                <div className="text-white/80 text-lg">Eco Warrior</div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Panel */}
        {showAccessibility && (
          <div className="mb-8">
            <AccessibilityToggle />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Goal Progress */}
            <HelpTooltip content="Track your weekly eco-points goal. Complete activities to earn points and fill this progress bar!">
              <Card className="card-hover">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Calendar className="h-6 w-6 text-primary" />
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
            </HelpTooltip>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <HelpTooltip content="Your daily streak! Log in every day to keep it going and earn bonus points.">
                <Card className="card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Flame className="h-8 w-8 text-accent animate-glow" />
                      <span className="text-4xl font-bold text-accent">{mockUser.streak}</span>
                    </div>
                    <p className="text-lg text-muted-foreground">Day Streak</p>
                  </CardContent>
                </Card>
              </HelpTooltip>
              
              <HelpTooltip content="Badges you've earned by completing eco-challenges and activities!">
                <Card className="card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Trophy className="h-8 w-8 text-badge-gold animate-bounce-gentle" />
                      <span className="text-4xl font-bold text-badge-gold">{mockUser.badges.length}</span>
                    </div>
                    <p className="text-lg text-muted-foreground">Badges Earned</p>
                  </CardContent>
                </Card>
              </HelpTooltip>
            </div>

            {/* Recent Activity */}
            <Card className="card-hover">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Clock className="h-6 w-6 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <activity.icon className="h-6 w-6 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium truncate">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <div className="text-lg font-bold text-success">+{activity.points}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Badges */}
            <Card className="card-hover">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Trophy className="h-6 w-6 text-badge-gold" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BadgeDisplay badges={userBadges} />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Button 
                variant="eco" 
                size="lg" 
                className="w-full h-16 flex-col gap-2 text-lg"
                onClick={() => setShowQuiz(true)}
              >
                <Play className="h-8 w-8" />
                <span>Take Quiz</span>
              </Button>
              <Button variant="sky" size="lg" className="w-full h-16 flex-col gap-2 text-lg">
                <Target className="h-8 w-8" />
                <span>Challenges</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={viewMode === 'mobile' ? 'view-mobile' : 'view-desktop'}>
      {viewMode === 'mobile' ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
}
