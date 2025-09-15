import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Target, 
  Users, 
  Camera, 
  CheckSquare, 
  Calendar,
  MapPin,
  Award,
  Clock,
  TrendingUp
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
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      {/* Header */}
      <header className="bg-gradient-reward text-accent-foreground p-4 rounded-b-2xl shadow-float">
        <h1 className="text-2xl font-display font-bold mb-2">
          🎯 {t('challenges')}
        </h1>
        <p className="text-accent-foreground/80 text-sm">Real-world environmental actions</p>
      </header>

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
}