import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/MobileNav';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HomeButton } from '@/components/HomeButton';
import { SimpleChart } from '@/components/SimpleChart';
import { useLanguage } from '@/hooks/useLanguage';
import achievementsImg from '@/assets/achievements.jpg';
import { 
  Users, 
  BookOpen, 
  Target, 
  TrendingUp,
  BarChart3
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
  const { language, setLanguage } = useLanguage();

  return (
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
            <LanguageToggle 
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
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

      <MobileNav isTeacher />
    </div>
  );
}