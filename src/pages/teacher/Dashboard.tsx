import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/MobileNav';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HomeButton } from '@/components/HomeButton';
import { SimpleChart } from '@/components/SimpleChart';
import { HelpTooltip } from '@/components/HelpTooltip';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useViewMode } from '@/hooks/useViewMode';
import achievementsImg from '@/assets/achievements.jpg';
import { 
  Users, 
  BookOpen, 
  Target, 
  TrendingUp,
  BarChart3,
  Menu,
  Home,
  Trophy,
  Gift,
  Settings,
  UserCheck
} from 'lucide-react';

// Mock teacher data
const teacherData = {
  name: "Mrs. Priya Sharma",
  school: "Green Valley High School",
  totalStudents: 45,
  activeStudents: 38,
  weeklyGrowth: 12.5
};

const weeklyData = [
  { label: 'Mon', value: 32 },
  { label: 'Tue', value: 28 },
  { label: 'Wed', value: 35 },
  { label: 'Thu', value: 42 },
  { label: 'Fri', value: 38 },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { settings } = useAccessibility();
  const { viewMode } = useViewMode();
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

  // Mobile Layout
  const MobileLayout = () => (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      <HomeButton />
      
      {/* Header with illustration */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-b-2xl shadow-eco relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${achievementsImg})` }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-display font-bold">
                Welcome back, {teacherData.name}! 👩‍🏫
              </h1>
              <p className="text-white/80 text-sm">{teacherData.school}</p>
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
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{teacherData.totalStudents}</div>
              <div className="text-white/80 text-sm">Total Students</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{teacherData.activeStudents}</div>
              <div className="text-white/80 text-sm">Active Students</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-mobile py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">{teacherData.activeStudents}</span>
              </div>
              <p className="text-sm text-muted-foreground">Active This Week</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-2xl font-bold text-success">{teacherData.weeklyGrowth}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Weekly Growth</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Weekly Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart data={weeklyData} type="line" height={100} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="eco" size="lg" className="h-20 flex-col gap-2">
            <BookOpen className="h-6 w-6" />
            <span>View Lessons</span>
          </Button>
          <Button variant="sky" size="lg" className="h-20 flex-col gap-2">
            <Target className="h-6 w-6" />
            <span>Challenges</span>
          </Button>
        </div>
      </div>

      {/* Accessibility Panel */}
      {showAccessibility && (
        <div className="container-mobile py-4">
          <AccessibilityToggle />
        </div>
      )}

      <MobileNav isTeacher />
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <HomeButton />
      <div className="container-desktop py-8">
        {/* Header with illustration */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-eco relative overflow-hidden mb-8">
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${achievementsImg})` }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold">
                  Welcome back, {teacherData.name}! 👩‍🏫
                </h1>
                <p className="text-white/80 text-lg">{teacherData.school}</p>
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
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{teacherData.totalStudents}</div>
                <div className="text-white/80 text-sm">Total Students</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{teacherData.activeStudents}</div>
                <div className="text-white/80 text-sm">Active Students</div>
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
              <span className="font-medium">Teacher Navigation</span>
            </Button>
            
            {showDesktopMenu && (
              <div className="absolute top-16 left-0 z-50 bg-white/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-2 min-w-[280px] animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    onClick={() => {
                      setShowDesktopMenu(false);
                      navigate('/teacher/dashboard');
                    }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Home className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Teacher Dashboard</span>
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
                    <span className="font-medium">View Lessons</span>
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
                    <span className="font-medium">Manage Challenges</span>
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
                    <span className="font-medium">Student Leaderboard</span>
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
                    <span className="font-medium">Student Rewards</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-4 px-4 py-3 rounded-xl hover:bg-muted/10 hover:text-muted-foreground transition-all duration-200"
                    onClick={() => {
                      setShowDesktopMenu(false);
                      // Add student management route when available
                    }}
                  >
                    <div className="p-2 rounded-lg bg-muted/10">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium">Manage Students</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HelpTooltip content="Number of students actively participating this week">
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Users className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold text-primary">{teacherData.activeStudents}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active This Week</p>
                </CardContent>
              </Card>
            </HelpTooltip>
            
            <HelpTooltip content="Percentage growth in student engagement this week">
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <TrendingUp className="h-8 w-8 text-success" />
                    <span className="text-3xl font-bold text-success">{teacherData.weeklyGrowth}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Weekly Growth</p>
                </CardContent>
              </Card>
            </HelpTooltip>

            <HelpTooltip content="Total number of students in your class">
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <UserCheck className="h-8 w-8 text-secondary" />
                    <span className="text-3xl font-bold text-secondary">{teacherData.totalStudents}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </CardContent>
              </Card>
            </HelpTooltip>

            <HelpTooltip content="Student engagement rate this week">
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <BarChart3 className="h-8 w-8 text-accent" />
                    <span className="text-3xl font-bold text-accent">84%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                </CardContent>
              </Card>
            </HelpTooltip>
          </div>

          {/* Analytics Chart */}
          <HelpTooltip content="Weekly student activity and engagement trends">
            <Card className="card-hover">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  Weekly Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart data={weeklyData} type="line" height={200} />
              </CardContent>
            </Card>
          </HelpTooltip>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HelpTooltip content="View and manage lesson content for your students">
              <Button variant="eco" size="lg" className="h-24 flex-col gap-3 text-lg">
                <BookOpen className="h-8 w-8" />
                <span>View Lessons</span>
              </Button>
            </HelpTooltip>
            
            <HelpTooltip content="Create and manage environmental challenges for students">
              <Button variant="sky" size="lg" className="h-24 flex-col gap-3 text-lg">
                <Target className="h-8 w-8" />
                <span>Challenges</span>
              </Button>
            </HelpTooltip>

            <HelpTooltip content="Monitor student progress and achievements">
              <Button variant="outline" size="lg" className="h-24 flex-col gap-3 text-lg">
                <Trophy className="h-8 w-8" />
                <span>Progress</span>
              </Button>
            </HelpTooltip>

            <HelpTooltip content="Access teacher settings and preferences">
              <Button variant="outline" size="lg" className="h-24 flex-col gap-3 text-lg">
                <Settings className="h-8 w-8" />
                <span>Settings</span>
              </Button>
            </HelpTooltip>
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