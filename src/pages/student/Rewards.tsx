import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileNav } from '@/components/MobileNav';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { PointsDisplay } from '@/components/PointsDisplay';
import { HomeButton } from '@/components/HomeButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HelpTooltip } from '@/components/HelpTooltip';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useViewMode } from '@/hooks/useViewMode';
import { 
  Gift, 
  Award, 
  Star, 
  ShoppingBag, 
  Leaf, 
  Crown,
  Lock,
  CheckCircle2,
  Menu,
  Home,
  BookOpen,
  Target,
  Trophy
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
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useAccessibility();
  const { viewMode } = useViewMode();
  const [activeTab, setActiveTab] = useState<'badges' | 'rewards'>('badges');
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userPoints = 2480;

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

  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  // Mobile Layout
  const MobileLayout = () => (
    <div className="min-h-screen bg-background pb-20 safe-area-top">
      <HomeButton />
      
      {/* Header */}
      <header className="bg-gradient-reward text-accent-foreground p-4 rounded-b-2xl shadow-float">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-display font-bold">
              🎁 {t('rewards')}
            </h1>
            <p className="text-accent-foreground/80 text-sm">Your achievements and prizes</p>
          </div>
          <div className="flex items-center gap-2">
            <PointsDisplay 
              points={userPoints}
              size="md"
              className="text-accent-foreground"
              animated={false}
            />
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
                  🎁 {t('rewards')}
                </h1>
                <p className="text-accent-foreground/80 text-lg">Your achievements and prizes</p>
              </div>
              <div className="flex items-center gap-4">
                <PointsDisplay 
                  points={userPoints}
                  size="lg"
                  className="text-accent-foreground"
                  animated={false}
                />
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
          <HelpTooltip content="Switch between badges and rewards to see your achievements and available prizes!">
            <div className="flex gap-3">
              <Button
                variant={activeTab === 'badges' ? 'default' : 'outline'}
                size="lg"
                onClick={() => setActiveTab('badges')}
                className="flex items-center gap-3 px-6 py-3"
              >
                <Award className="h-5 w-5" />
                Badges
              </Button>
              <Button
                variant={activeTab === 'rewards' ? 'default' : 'outline'}
                size="lg"
                onClick={() => setActiveTab('rewards')}
                className="flex items-center gap-3 px-6 py-3"
              >
                <Gift className="h-5 w-5" />
                Rewards
              </Button>
            </div>
          </HelpTooltip>

          {/* Content */}
          {activeTab === 'badges' ? (
            <div className="space-y-6">
              {/* Earned Badges */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Earned Badges ({earnedBadges.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => (
                    <Card key={badge.id} className="card-hover">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{badge.icon}</div>
                        <h4 className="font-semibold mb-2">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                        <Badge className={`badge-${badge.type}`}>
                          Earned
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Available Badges */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Badges ({availableBadges.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableBadges.map((badge) => (
                    <Card key={badge.id} className="card-hover opacity-60">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{badge.icon}</div>
                        <h4 className="font-semibold mb-2">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                        <Badge variant="secondary">
                          Not Earned
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{reward.icon}</div>
                      <h4 className="font-semibold mb-2">{reward.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-points">{reward.cost} pts</span>
                        {reward.claimed && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                      </div>

                      <Button 
                        variant={reward.claimed ? 'outline' : reward.available && userPoints >= reward.cost ? 'reward' : 'ghost'}
                        size="lg"
                        className="w-full"
                        disabled={reward.claimed || !reward.available || userPoints < reward.cost}
                      >
                        {reward.claimed ? (
                          'Claimed'
                        ) : !reward.available ? (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Soon
                          </>
                        ) : userPoints >= reward.cost ? (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Claim
                          </>
                        ) : (
                          'Need More Points'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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