import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { PointsDisplay } from '@/components/PointsDisplay';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Gift, 
  Award, 
  Star, 
  ShoppingBag, 
  Leaf, 
  Crown,
  Lock,
  CheckCircle2
} from 'lucide-react';

const badges = [
  { id: '1', name: 'Tree Planter', description: 'Planted 10 trees', icon: '🌱', type: 'gold' as const, earned: true, earnedAt: new Date() },
  { id: '2', name: 'Water Saver', description: 'Saved 1000L water', icon: '💧', type: 'silver' as const, earned: true, earnedAt: new Date() },
  { id: '3', name: 'Energy Efficient', description: 'Reduced energy by 50%', icon: '⚡', type: 'bronze' as const, earned: true, earnedAt: new Date() },
  { id: '4', name: 'Recycling Hero', description: 'Recycled 100 items', icon: '♻️', type: 'gold' as const, earned: false },
  { id: '5', name: 'Climate Champion', description: 'Complete climate course', icon: '🌍', type: 'silver' as const, earned: false },
  { id: '6', name: 'Eco Warrior', description: 'Reach level 10', icon: '🛡️', type: 'gold' as const, earned: false },
];

const rewards = [
  { 
    id: '1', 
    name: 'Eco-Friendly Water Bottle', 
    description: 'Premium steel water bottle',
    cost: 500, 
    category: 'Physical',
    thumbnail: '🍼',
    available: true,
    claimed: false
  },
  { 
    id: '2', 
    name: 'Plant Sapling Kit', 
    description: 'Everything to grow your own tree',
    cost: 300, 
    category: 'Physical',
    thumbnail: '🌱',
    available: true,
    claimed: false
  },
  { 
    id: '3', 
    name: 'Digital Certificate', 
    description: 'Environmental Leadership Certificate',
    cost: 1000, 
    category: 'Digital',
    thumbnail: '📜',
    available: true,
    claimed: true
  },
  { 
    id: '4', 
    name: 'Solar Power Bank', 
    description: 'Eco-friendly portable charger',
    cost: 1500, 
    category: 'Physical',
    thumbnail: '🔋',
    available: false,
    claimed: false
  },
];

export default function Rewards() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'badges' | 'rewards'>('badges');
  const userPoints = 2480;

  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      {/* Header */}
      <header className="bg-gradient-reward text-accent-foreground p-4 rounded-b-2xl shadow-float">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-display font-bold">
            🎁 {t('rewards')}
          </h1>
          <PointsDisplay 
            points={userPoints}
            size="md"
            className="text-accent-foreground"
            animated={false}
          />
        </div>
        <p className="text-accent-foreground/80 text-sm">Your achievements and prizes</p>
      </header>

      <div className="container-mobile py-6 space-y-6">
        {/* Tab Switcher */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'badges' ? 'default' : 'outline'}
            onClick={() => setActiveTab('badges')}
            className="flex-1 flex items-center gap-2"
          >
            <Award className="h-4 w-4" />
            Badges
          </Button>
          <Button
            variant={activeTab === 'rewards' ? 'default' : 'outline'}
            onClick={() => setActiveTab('rewards')}
            className="flex-1 flex items-center gap-2"
          >
            <Gift className="h-4 w-4" />
            Shop
          </Button>
        </div>

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            {/* Earned Badges */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-badge-gold" />
                  Earned Badges ({earnedBadges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => (
                    <BadgeDisplay
                      key={badge.id}
                      badge={badge}
                      size="lg"
                      showDescription
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Badges */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  Next Goals ({availableBadges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {availableBadges.map((badge) => (
                    <BadgeDisplay
                      key={badge.id}
                      badge={badge}
                      locked
                      size="lg"
                      showDescription
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badge Progress */}
            <Card className="card-hover">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round((earnedBadges.length / badges.length) * 100)}%
                </div>
                <p className="text-muted-foreground">Badge Collection Complete</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {earnedBadges.length} of {badges.length} badges earned
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rewards Shop Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="card-hover">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-warning/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {reward.thumbnail}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-foreground leading-tight">
                          {reward.name}
                        </h3>
                        {reward.claimed && (
                          <Badge className="bg-success/10 text-success" variant="secondary">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Claimed
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {reward.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {reward.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-points font-semibold">
                            <Leaf className="h-3 w-3" />
                            {reward.cost} pts
                          </div>
                        </div>

                        <Button 
                          variant={reward.claimed ? 'outline' : reward.available && userPoints >= reward.cost ? 'reward' : 'ghost'}
                          size="sm"
                          disabled={reward.claimed || !reward.available || userPoints < reward.cost}
                        >
                          {reward.claimed ? (
                            'Claimed'
                          ) : !reward.available ? (
                            <>
                              <Lock className="h-3 w-3 mr-1" />
                              Soon
                            </>
                          ) : userPoints >= reward.cost ? (
                            <>
                              <ShoppingBag className="h-3 w-3 mr-1" />
                              Claim
                            </>
                          ) : (
                            'Need More Points'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Points Summary */}
            <Card className="card-hover border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold mb-2">Keep earning points!</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete lessons and challenges to unlock more rewards
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <div>
                    <div className="font-bold text-success">
                      {rewards.filter(r => r.claimed).length}
                    </div>
                    <div className="text-muted-foreground">Claimed</div>
                  </div>
                  <div>
                    <div className="font-bold text-accent">
                      {rewards.filter(r => r.available && !r.claimed).length}
                    </div>
                    <div className="text-muted-foreground">Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  );
}