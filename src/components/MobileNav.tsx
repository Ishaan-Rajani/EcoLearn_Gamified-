import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Target, 
  Trophy, 
  Gift,
  User,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface MobileNavProps {
  isTeacher?: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isTeacher = false }) => {
  const { t } = useLanguage();

  const studentNavItems = [
    { to: '/dashboard', icon: Home, label: t('dashboard') },
    { to: '/lessons', icon: BookOpen, label: t('lessons') },
    { to: '/challenges', icon: Target, label: t('challenges') },
    { to: '/leaderboard', icon: Trophy, label: t('leaderboard') },
    { to: '/rewards', icon: Gift, label: t('rewards') },
  ];

  const teacherNavItems = [
    { to: '/teacher/dashboard', icon: BarChart3, label: t('dashboard') },
    { to: '/teacher/students', icon: User, label: 'Students' },
    { to: '/teacher/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/leaderboard', icon: Trophy, label: t('leaderboard') },
  ];

  const navItems = isTeacher ? teacherNavItems : studentNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'text-primary bg-primary/10 scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-xs font-medium truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};