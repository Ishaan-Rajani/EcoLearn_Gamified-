import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { PointsDisplay } from '@/components/PointsDisplay';
import { HomeButton } from '@/components/HomeButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HelpTooltip } from '@/components/HelpTooltip';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useViewMode } from '@/hooks/useViewMode';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  School,
  Users,
  Menu,
  Home,
  BookOpen,
  Target,
  Gift
} from 'lucide-react';

const individualLeaderboard = [
  { rank: 1, name: 'Priya Sharma', school: 'Green Valley High', points: 4250, change: 2, avatar: 'PS' },
  { rank: 2, name: 'Arjun Patel', school: 'Eco International', points: 3890, change: 0, avatar: 'AP' },
  { rank: 3, name: 'Meera Singh', school: 'Rural Education Center', points: 3654, change: -1, avatar: 'MS' },
  { rank: 4, name: 'Rahul Kumar', school: 'Green Valley High', points: 3200, change: 1, avatar: 'RK' },
  { rank: 5, name: 'Sneha Gupta', school: 'Village Primary', points: 2980, change: 3, avatar: 'SG' },
  { rank: 6, name: 'Karan Joshi', school: 'Eco International', points: 2750, change: -2, avatar: 'KJ' },
  { rank: 7, name: 'Anita Roy', school: 'Rural Education Center', points: 2650, change: 1, avatar: 'AR' },
  { rank: 8, name: 'Vikram Rao', school: 'Green Valley High', points: 2480, change: 0, avatar: 'VR' },
];

const schoolLeaderboard = [
  { rank: 1, name: 'Green Valley High School', location: 'Mumbai', totalPoints: 45680, students: 234, change: 1 },
  { rank: 2, name: 'Eco International School', location: 'Pune', totalPoints: 42150, students: 189, change: -1 },
  { rank: 3, name: 'Rural Education Center', location: 'Nashik', totalPoints: 38920, students: 156, change: 0 },
  { rank: 4, name: 'Village Primary School', location: 'Aurangabad', totalPoints: 35200, students: 98, change: 2 },
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useAccessibility();
  const { viewMode } = useViewMode();
  const [activeTab, setActiveTab] = useState<'individual' | 'school'>('individual');
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDesktopMenu(false);
      }
    };

    if (showDesktopMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDesktopMenu]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-badge-gold" />;
      case 2: return <Medal className="h-5 w-5 text-badge-silver" />;
      case 3: return <Medal className="h-5 w-5 text-badge-bronze" />;
      default: return <span className="font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-badge-gold/10 text-badge-gold border-badge-gold/20';
      case 2: return 'bg-badge-silver/10 text-badge-silver border-badge-silver/20';
      case 3: return 'bg-badge-bronze/10 text-badge-bronze border-badge-bronze/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-success" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-destructive" />;
    return <span className="text-muted-foreground">-</span>;
  };

  // Mobile Layout
  const MobileLayout = () => (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      <HomeButton />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-badge-gold to-accent text-badge-gold-foreground p-4 rounded-b-2xl shadow-float">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">
              🏆 {t('leaderboard')}
            </h1>
            <p className="text-white/80 text-sm">Top eco-warriors and schools</p>
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
      </header>

      {/* Accessibility Panel */}
      {showAccessibility && (
        <div className="container-mobile py-4">
          <AccessibilityToggle />
        </div>
      )}

      <div className="container-mobile py-6 space-y-6">
        {/* Tab Switcher */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'individual' ? 'default' : 'outline'}
            onClick={() => setActiveTab('individual')}
            className="flex-1 flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Individual
          </Button>
          <Button
            variant={activeTab === 'school' ? 'default' : 'outline'}
            onClick={() => setActiveTab('school')}
            className="flex-1 flex items-center gap-2"
          >
            <School className="h-4 w-4" />
            Schools
          </Button>
        </div>

        {/* Individual Leaderboard */}
        {activeTab === 'individual' && (
          <div className="space-y-3">
            {individualLeaderboard.map((user, index) => (
              <Card key={user.rank} className={`card-hover ${index < 3 ? 'border-2' : ''} ${
                index === 0 ? 'border-badge-gold' : 
                index === 1 ? 'border-badge-silver' : 
                index === 2 ? 'border-badge-bronze' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}>
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.school}</p>
                    </div>

                    {/* Points and Change */}
                    <div className="text-right">
                      <div className="font-bold text-points">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        {getChangeIcon(user.change)}
                        <span className="text-xs text-muted-foreground">
                          {user.change !== 0 && Math.abs(user.change)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* School Leaderboard */}
        {activeTab === 'school' && (
          <div className="space-y-3">
            {schoolLeaderboard.map((school, index) => (
              <Card key={school.rank} className={`card-hover ${index < 3 ? 'border-2' : ''} ${
                index === 0 ? 'border-badge-gold' : 
                index === 1 ? 'border-badge-silver' : 
                index === 2 ? 'border-badge-bronze' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(school.rank)}`}>
                      {getRankIcon(school.rank)}
                    </div>

                    {/* School Icon */}
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <School className="h-5 w-5 text-primary" />
                    </div>

                    {/* School Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{school.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {school.location} • {school.students} students
                      </p>
                    </div>

                    {/* Points and Change */}
                    <div className="text-right">
                      <div className="font-bold text-points">
                        {school.totalPoints.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        {getChangeIcon(school.change)}
                        <span className="text-xs text-muted-foreground">
                          {school.change !== 0 && Math.abs(school.change)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Your Position */}
        <Card className="card-hover border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-primary" />
              Your Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Rank #2</div>
                <div className="text-sm text-muted-foreground">
                  {activeTab === 'individual' ? 'Individual ranking' : 'School ranking'}
                </div>
              </div>
              <PointsDisplay 
                points={3890}
                change={25}
                size="md"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNav />
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-badge-gold/5 to-accent/10">
      <HomeButton />
      <div className="container-desktop py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-badge-gold to-accent text-badge-gold-foreground p-8 rounded-2xl shadow-float relative overflow-hidden mb-8">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold text-white">
                  🏆 {t('leaderboard')}
                </h1>
                <p className="text-white/80 text-lg">Top eco-warriors and schools</p>
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
          </div>
        </div>

        {/* Accessibility Panel */}
        {showAccessibility && (
          <div className="mb-8">
            <AccessibilityToggle />
          </div>
        )}

        {/* Desktop Navigation Menu */}
        <div className="mb-8 relative" ref={menuRef}>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowDesktopMenu(!showDesktopMenu)}
              className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
                showDesktopMenu 
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                  : 'hover:bg-muted/50 hover:border-primary/50'
              }`}
            >
              <Menu className={`h-5 w-5 transition-transform duration-200 ${showDesktopMenu ? 'rotate-90' : ''}`} />
              <span className="font-medium">Navigation</span>
            </Button>
            
            {showDesktopMenu && (
              <div className="absolute top-16 left-0 z-50 bg-white/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-2 min-w-[240px] animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    onClick={() => {
                      setShowDesktopMenu(false);
                      navigate('/dashboard');
                    }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Home className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Dashboard</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-4 px-4 py-3 rounded-xl hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                    onClick={() => {
                      setShowDesktopMenu(false);
                      navigate('/lessons');
                    }}
                  >
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <BookOpen className="h-4 w-4 text-secondary" />
                    </div>
                    <span className="font-medium">Lessons</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-4 px-4 py-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-all duration-200"
                    onClick={() => {
                      setShowDesktopMenu(false);
                      navigate('/challenges');
                    }}
                  >
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Target className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium">Challenges</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-4 px-4 py-3 rounded-xl hover:bg-warning/10 hover:text-warning transition-all duration-200"
                    onClick={() => {
                      setShowDesktopMenu(false);
                      navigate('/leaderboard');
                    }}
                  >
                    <div className="p-2 rounded-lg bg-warning/10">
                      <Trophy className="h-4 w-4 text-warning" />
                    </div>
                    <span className="font-medium">Leaderboard</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-4 px-4 py-3 rounded-xl hover:bg-success/10 hover:text-success transition-all duration-200"
                    onClick={() => {
                      setShowDesktopMenu(false);
                      navigate('/rewards');
                    }}
                  >
                    <div className="p-2 rounded-lg bg-success/10">
                      <Gift className="h-4 w-4 text-success" />
                    </div>
                    <span className="font-medium">Rewards</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Tab Switcher */}
          <HelpTooltip content="Switch between individual and school leaderboards to see different rankings!">
            <div className="flex gap-3">
              <Button
                variant={activeTab === 'individual' ? 'default' : 'outline'}
                size="lg"
                onClick={() => setActiveTab('individual')}
                className="flex items-center gap-3 px-6 py-3"
              >
                <Users className="h-5 w-5" />
                Individual
              </Button>
              <Button
                variant={activeTab === 'school' ? 'default' : 'outline'}
                size="lg"
                onClick={() => setActiveTab('school')}
                className="flex items-center gap-3 px-6 py-3"
              >
                <School className="h-5 w-5" />
                Schools
              </Button>
            </div>
          </HelpTooltip>

          {/* Leaderboard Content */}
          <div className="space-y-6">
            {activeTab === 'individual' ? (
              <div className="space-y-4">
                {individualLeaderboard.map((person) => (
                  <Card key={person.rank} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-badge-gold/20 to-accent/20">
                            {getRankIcon(person.rank)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{person.name}</h3>
                            <p className="text-sm text-muted-foreground">{person.school}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-points">
                            {person.points.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            {getChangeIcon(person.change)}
                            <span className="text-sm text-muted-foreground">
                              {person.change !== 0 && Math.abs(person.change)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {schoolLeaderboard.map((school) => (
                  <Card key={school.rank} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-badge-gold/20 to-accent/20">
                            {getRankIcon(school.rank)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{school.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {school.location} • {school.students} students
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-points">
                            {school.totalPoints.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            {getChangeIcon(school.change)}
                            <span className="text-sm text-muted-foreground">
                              {school.change !== 0 && Math.abs(school.change)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Your Progress */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Your Progress</h3>
              <div className="flex justify-center">
                <PointsDisplay
                  points={3890}
                  change={25}
                  size="lg"
                />
              </div>
            </CardContent>
          </Card>
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