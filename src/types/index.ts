export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  school?: School;
  ecoPoints: number;
  level: number;
  badges: Badge[];
  avatar?: string;
  disabled?: boolean;
}

export interface School {
  id: string;
  name: string;
  location: string;
  type: 'rural' | 'urban';
  totalPoints: number;
  studentCount: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'bronze' | 'silver' | 'gold';
  earnedAt?: Date; // Make optional since not all badges are earned
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'waste-management' | 'climate-change' | 'biodiversity' | 'renewable-energy' | 'water-conservation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  points: number;
  completed: boolean;
  thumbnail: string;
  content: LessonContent[];
}

export interface LessonContent {
  type: 'text' | 'image' | 'video' | 'quiz' | 'interactive';
  content: any;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'task' | 'quiz' | 'community';
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in days
  completed: boolean;
  participants: number;
  thumbnail: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  change: number; // position change from last week
}

export interface Language {
  code: 'en' | 'hi';
  name: string;
  flag: string;
}

export interface AppState {
  user: User | null;
  currentLanguage: Language;
  isOffline: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export interface AccessibilitySettings {
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  showFocusIndicators: boolean;
  showHelpTooltips: boolean;
}

export interface AppState {
  user: User | null;
  currentLanguage: Language;
  isOffline: boolean;
  notifications: Notification[];
  accessibility: AccessibilitySettings;
}