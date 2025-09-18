import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { HomeButton } from '@/components/HomeButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HelpTooltip } from '@/components/HelpTooltip';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useViewMode } from '@/hooks/useViewMode';
import { 
  Target, 
  Users, 
  Camera, 
  CheckSquare, 
  Calendar,
  MapPin,
  Award,
  Clock,
  TrendingUp,
  Menu,
  Home,
  BookOpen,
  Trophy,
  Gift
} from 'lucide-react';

const challenges = [
  {
    id: '1',
    title: 'Plant a Tree Challenge',
    description: 'Plant a tree in your neighborhood and share a photo',
    type: 'photo',
    difficulty: 'easy',
    points: 200,
    timeLimit: 7,
    participants: 1247,
    completed: false,
    thumbnail: '🌳',
    location: 'Anywhere',
    category: 'Action'
  },
  {
    id: '2',
    title: 'Plastic-Free Week',
    description: 'Go one week without single-use plastics',
    type: 'task',
    difficulty: 'medium',
    points: 350,
    timeLimit: 7,
    participants: 892,
    completed: true,
    thumbnail: '🚫',
    location: 'Home',
    category: 'Lifestyle'
  },
  {
    id: '3',
    title: 'Energy Audit Quiz',
    description: 'Complete the home energy efficiency assessment',
    type: 'quiz',
    difficulty: 'easy',
    points: 150,
    timeLimit: 3,
    participants: 2156,
    completed: false,
    thumbnail: '⚡',
    location: 'Online',
    category: 'Learning'
  },
  {
    id: '4',
    title: 'Community Cleanup',
    description: 'Organize or join a local cleanup event',
    type: 'community',
    difficulty: 'hard',
    points: 500,
    timeLimit: 14,
    participants: 634,
    completed: false,
    thumbnail: '🧹',
    location: 'Community',
    category: 'Action'
  },
];

const categories = ['All', 'Action', 'Learning', 'Lifestyle'];

export default function Challenges() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useAccessibility();
  const { viewMode } = useViewMode();
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const filteredChallenges = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'task': return CheckSquare;
      case 'quiz': return Target;
      case 'community': return Users;
      default: return Target;
    }
  };

  // Mobile Layout
  const MobileLayout = () => (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      <HomeButton />
      
      {/* Header */}
      <header className="bg-gradient-reward text-accent-foreground p-4 rounded-b-2xl shadow-float">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-display font-bold">
              🎯 {t('challenges')}
            </h1>
            <p className="text-accent-foreground/80 text-sm">Real-world environmental actions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAccessibility(!showAccessibility)}
              className="text-accent-foreground hover:bg-accent-foreground/20 border border-accent-foreground/30 px-3 py-2 rounded-lg"
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
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Active Challenges */}
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => {
            const TypeIcon = getTypeIcon(challenge.type);
            
            return (
              <Card key={challenge.id} className="card-hover">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-warning/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {challenge.thumbnail}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-foreground leading-tight">
                          {challenge.title}
                        </h3>
                        {challenge.completed && (
                          <Badge className="bg-success/10 text-success" variant="secondary">
                            ✓ Done
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {challenge.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <TypeIcon className="h-3 w-3" />
                          {challenge.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {challenge.timeLimit}d left
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {challenge.location}
                        </div>
                        <Badge className={getDifficultyColor(challenge.difficulty)} variant="secondary">
                          {challenge.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-points font-semibold text-sm">
                            <Award className="h-3 w-3" />
                            {challenge.points} pts
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Users className="h-3 w-3" />
                            {challenge.participants.toLocaleString()}
                          </div>
                        </div>

                        <Button 
                          variant={challenge.completed ? 'outline' : 'reward'}
                          size="sm"
                          disabled={challenge.completed}
                        >
                          {challenge.completed ? 'Completed' : t('joinChallenge')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Challenge Stats */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
              Your Challenge Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success">
                  {challenges.filter(c => c.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">{t('completedChallenge')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">
                  {challenges.filter(c => !c.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">{t('activeChallenge')}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-points">
                  {challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Points from Challenges</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNav />
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-warning/10">
      <HomeButton />
      <div className="container-desktop py-8">
        {/* Header */}
        <div className="bg-gradient-reward text-accent-foreground p-8 rounded-2xl shadow-float relative overflow-hidden mb-8">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold">
                  🎯 {t('challenges')}
                </h1>
                <p className="text-accent-foreground/80 text-lg">Real-world environmental actions</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowAccessibility(!showAccessibility)}
                  className="text-accent-foreground hover:bg-accent-foreground/20 border border-accent-foreground/30 px-6 py-3 rounded-lg"
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
              <span className="font-medium">{t('navigation')}</span>
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
                    <span className="font-medium">{t('dashboard')}</span>
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
          {/* Category Filter */}
          <HelpTooltip content="Filter challenges by type to find what you're interested in!">
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-3 px-6 py-3"
                >
                  {category}
                </Button>
              ))}
            </div>
          </HelpTooltip>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => {
              const TypeIcon = getTypeIcon(challenge.type);
              return (
                <Card key={challenge.id} className="card-hover group">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Thumbnail */}
                      <div className="w-full h-24 bg-gradient-to-br from-accent/20 to-warning/20 rounded-xl flex items-center justify-center text-3xl">
                        {challenge.thumbnail}
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-lg text-foreground leading-tight">
                            {challenge.title}
                          </h3>
                          {challenge.completed && (
                            <CheckSquare className="h-6 w-6 text-success flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {challenge.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <TypeIcon className="h-4 w-4" />
                            {challenge.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {challenge.timeLimit}d left
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {challenge.location}
                          </div>
                          <Badge className={getDifficultyColor(challenge.difficulty)} variant="secondary">
                            {challenge.difficulty}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {challenge.participants} participants
                          </div>
                          <div className="text-sm font-bold text-points">
                            {challenge.points} pts
                          </div>
                        </div>

                        <Button 
                          variant={challenge.completed ? 'outline' : 'eco'}
                          size="lg"
                          className="w-full"
                        >
                          {challenge.completed ? 'Completed' : 'Join Challenge'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats Summary */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-success mb-2">
                    {challenges.filter(c => c.completed).length}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('completedChallenge')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-warning mb-2">
                    {challenges.filter(c => !c.completed).length}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('activeChallenge')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-points mb-2">
                    {challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Points from Challenges</div>
                </div>
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