import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { PointsDisplay } from '@/components/PointsDisplay';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  School,
  Users
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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'individual' | 'school'>('individual');

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

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      {/* Header */}
      <header className="bg-gradient-to-r from-badge-gold to-accent text-badge-gold-foreground p-4 rounded-b-2xl shadow-float">
        <h1 className="text-2xl font-display font-bold mb-2 text-white">
          🏆 {t('leaderboard')}
        </h1>
        <p className="text-white/80 text-sm">Top eco-warriors and schools</p>
      </header>

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
}