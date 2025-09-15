import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/MobileNav';
import { EcoProgress } from '@/components/EcoProgress';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Users, 
  BookOpen, 
  Target, 
  Trophy, 
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Mock teacher data
const teacherData = {
  name: "Mrs. Priya Sharma",
  school: "Green Valley High School",
  totalStudents: 45,
  activeStudents: 38,
  completedLessons: 127,
  activeChallenges: 8,
  totalEcoPoints: 45680,
  weeklyGrowth: 12.5
};

const classStats = [
  { grade: 'Grade 6A', students: 15, avgPoints: 1250, completion: 85 },
  { grade: 'Grade 7B', students: 18, avgPoints: 1580, completion: 92 },
  { grade: 'Grade 8A', students: 12, avgPoints: 2100, completion: 78 },
];

const recentActivity = [
  { student: 'Arjun P.', action: 'Completed Water Conservation', points: 150, time: '2 hours ago' },
  { student: 'Meera S.', action: 'Earned Tree Planter Badge', points: 200, time: '4 hours ago' },
  { student: 'Rahul K.', action: 'Joined Cleanup Challenge', points: 100, time: '1 day ago' },
  { student: 'Sneha G.', action: 'Finished Energy Quiz', points: 75, time: '1 day ago' },
];

export default function TeacherDashboard() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-b-2xl shadow-eco">
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
            <div className="text-2xl font-bold">{teacherData.totalEcoPoints.toLocaleString()}</div>
            <div className="text-white/80 text-sm">Class Points</div>
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

        {/* Class Performance */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Class Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {classStats.map((classData) => (
              <div key={classData.grade} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{classData.grade}</h4>
                    <p className="text-sm text-muted-foreground">
                      {classData.students} students • Avg: {classData.avgPoints} pts
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{classData.completion}%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
                <EcoProgress 
                  current={classData.completion}
                  max={100}
                  variant="compact"
                  showPoints={false}
                />
              </div>
            ))}
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

        {/* Recent Student Activity */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Student Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    <span className="text-primary">{activity.student}</span> {activity.action}
                  </p>
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

        {/* Analytics Summary */}
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              This Week's Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success">{teacherData.completedLessons}</div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{teacherData.activeChallenges}</div>
                <div className="text-sm text-muted-foreground">Active Challenges</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <div className="grid grid-cols-1 gap-4">
          <Button variant="outline" size="lg" className="justify-start gap-3">
            <Users className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Student Progress Report</div>
              <div className="text-sm text-muted-foreground">Individual performance analytics</div>
            </div>
          </Button>
          <Button variant="outline" size="lg" className="justify-start gap-3">
            <Award className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Badge & Achievement Report</div>
              <div className="text-sm text-muted-foreground">Track student achievements</div>
            </div>
          </Button>
        </div>
      </div>

      <MobileNav isTeacher />
    </div>
  );
}