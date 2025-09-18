import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { EcoProgress } from '@/components/EcoProgress';
import { HomeButton } from '@/components/HomeButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HelpTooltip } from '@/components/HelpTooltip';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useViewMode } from '@/hooks/useViewMode';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  Award,
  Leaf,
  Droplets,
  Zap,
  Recycle,
  Menu,
  Home,
  Target,
  Trophy,
  Gift
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: BookOpen },
  { id: 'climate', name: 'Climate', icon: Leaf },
  { id: 'water', name: 'Water', icon: Droplets },
  { id: 'energy', name: 'Energy', icon: Zap },
  { id: 'waste', name: 'Waste', icon: Recycle },
];

const lessons = [
  {
    id: '1',
    title: 'Renewable Energy Basics',
    description: 'Learn about solar, wind, and other clean energy sources',
    category: 'energy',
    difficulty: 'beginner',
    duration: 15,
    points: 50,
    completed: true,
    progress: 100,
    thumbnail: '🌞'
  },
  {
    id: '2',
    title: 'Water Conservation Techniques',
    description: 'Discover ways to save water in daily life',
    category: 'water',
    difficulty: 'beginner',
    duration: 20,
    points: 75,
    completed: false,
    progress: 60,
    thumbnail: '💧'
  },
  {
    id: '3',
    title: 'Climate Change Effects',
    description: 'Understanding global warming and its impacts',
    category: 'climate',
    difficulty: 'intermediate',
    duration: 25,
    points: 100,
    completed: false,
    progress: 0,
    thumbnail: '🌍'
  },
  {
    id: '4',
    title: 'Waste Segregation Guide',
    description: 'Learn proper waste sorting and recycling',
    category: 'waste',
    difficulty: 'beginner',
    duration: 18,
    points: 60,
    completed: false,
    progress: 30,
    thumbnail: '♻️'
  },
];

export default function Lessons() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useAccessibility();
  const { viewMode } = useViewMode();
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/10 text-success';
      case 'intermediate': return 'bg-warning/10 text-warning';
      case 'advanced': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Mobile Layout
  const MobileLayout = () => (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      <HomeButton />
      
      {/* Header */}
      <header className="bg-gradient-sky text-white p-4 rounded-b-2xl shadow-eco">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-display font-bold">
              📚 {t('lessons')}
            </h1>
            <p className="text-white/80 text-sm">Interactive environmental lessons</p>
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
        {/* Category Filter */}
        <HelpTooltip content="Filter lessons by category to find what interests you most!">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </HelpTooltip>

        {/* Lessons Grid */}
        <div className="space-y-4">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {lesson.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground leading-tight">
                        {lesson.title}
                      </h3>
                      {lesson.completed && (
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {lesson.description}
                    </p>

                    {/* Progress for incomplete lessons */}
                    {!lesson.completed && lesson.progress > 0 && (
                      <div className="mb-3">
                        <EcoProgress 
                          current={lesson.progress}
                          max={100}
                          variant="compact"
                          showPoints={false}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}m
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {lesson.points} pts
                        </div>
                        <Badge className={getDifficultyColor(lesson.difficulty)} variant="secondary">
                          {lesson.difficulty}
                        </Badge>
                      </div>

                      <Button 
                        variant={lesson.completed ? 'outline' : 'eco'}
                        size="sm"
                      >
                        {lesson.completed ? (
                          'Review'
                        ) : lesson.progress > 0 ? (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            {t('continue')}
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            {t('start')}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-success">
                  {lessons.filter(l => l.completed).length}
                </div>
                <div className="text-xs text-muted-foreground">{t('completedLessons')}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-warning">
                  {lessons.filter(l => l.progress > 0 && !l.completed).length}
                </div>
                <div className="text-xs text-muted-foreground">{t('inProgress')}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-points">
                  {lessons.filter(l => l.completed).reduce((sum, l) => sum + l.points, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Points Earned</div>
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/10">
      <HomeButton />
      <div className="container-desktop py-8">
        {/* Header */}
        <div className="bg-gradient-sky text-white p-8 rounded-2xl shadow-eco relative overflow-hidden mb-8">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold">
                  📚 {t('lessons')}
                </h1>
                <p className="text-white/80 text-lg">Interactive environmental lessons</p>
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
          {/* Category Filter */}
          <HelpTooltip content="Filter lessons by category to find what interests you most!">
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-3 px-6 py-3"
                >
                  <category.icon className="h-5 w-5" />
                  {category.name}
                </Button>
              ))}
            </div>
          </HelpTooltip>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="card-hover group">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Thumbnail */}
                    <div className="w-full h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-3xl">
                      {lesson.thumbnail}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg text-foreground leading-tight">
                          {lesson.title}
                        </h3>
                        {lesson.completed && (
                          <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>

                      {/* Progress for incomplete lessons */}
                      {!lesson.completed && lesson.progress > 0 && (
                        <div>
                          <EcoProgress 
                            current={lesson.progress}
                            max={100}
                            variant="compact"
                            showPoints={false}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {lesson.duration}m
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {lesson.points} pts
                          </div>
                          <Badge className={getDifficultyColor(lesson.difficulty)} variant="secondary">
                            {lesson.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <Button 
                        variant={lesson.completed ? 'outline' : 'eco'}
                        size="lg"
                        className="w-full"
                      >
                        {lesson.completed ? (
                          'Review'
                        ) : lesson.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            {t('continue')}
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            {t('start')}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Summary */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-success mb-2">
                    {lessons.filter(l => l.completed).length}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('completedLessons')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-warning mb-2">
                    {lessons.filter(l => l.progress > 0 && !l.completed).length}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('inProgress')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-points mb-2">
                    {lessons.filter(l => l.completed).reduce((sum, l) => sum + l.points, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
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