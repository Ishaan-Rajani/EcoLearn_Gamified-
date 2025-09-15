import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { EcoProgress } from '@/components/EcoProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  Award,
  Leaf,
  Droplets,
  Zap,
  Recycle
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
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      {/* Header */}
      <header className="bg-gradient-sky text-white p-4 rounded-b-2xl shadow-eco">
        <h1 className="text-2xl font-display font-bold mb-2">
          📚 {t('lessons')}
        </h1>
        <p className="text-white/80 text-sm">Interactive environmental lessons</p>
      </header>

      <div className="container-mobile py-6 space-y-6">
        {/* Category Filter */}
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
}