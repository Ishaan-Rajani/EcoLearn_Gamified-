import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations for demo
const translations = {
  en: {
    // Navigation
    'dashboard': 'Dashboard',
    'lessons': 'Lessons',
    'challenges': 'Challenges',
    'leaderboard': 'Leaderboard',
    'rewards': 'Rewards',
    'profile': 'Profile',
    
    // Common
    'login': 'Login',
    'signup': 'Sign Up',
    'welcome': 'Welcome',
    'ecoPoints': 'Eco Points',
    'level': 'Level',
    'progress': 'Progress',
    'complete': 'Complete',
    'start': 'Start',
    'continue': 'Continue',
    
    // Dashboard
    'welcomeBack': 'Welcome back',
    'todaysGoal': "Today's Goal",
    'weeklyProgress': 'Weekly Progress',
    'recentActivity': 'Recent Activity',
    
    // Lessons
    'allLessons': 'All Lessons',
    'completedLessons': 'Completed',
    'inProgress': 'In Progress',
    
    // Challenges
    'activeChallenge': 'Active Challenges',
    'completedChallenge': 'Completed',
    'joinChallenge': 'Join Challenge',
    
    // School selection
    'selectSchool': 'Select Your School',
    'schoolType': 'School Type',
    'rural': 'Rural',
    'urban': 'Urban',
  },
  hi: {
    // Navigation
    'dashboard': 'डैशबोर्ड',
    'lessons': 'पाठ',
    'challenges': 'चुनौतियां',
    'leaderboard': 'लीडरबोर्ड',
    'rewards': 'पुरस्कार',
    'profile': 'प्रोफाइल',
    
    // Common
    'login': 'लॉगिन',
    'signup': 'साइन अप',
    'welcome': 'स्वागत',
    'ecoPoints': 'इको पॉइंट्स',
    'level': 'स्तर',
    'progress': 'प्रगति',
    'complete': 'पूर्ण',
    'start': 'शुरू',
    'continue': 'जारी रखें',
    
    // Dashboard
    'welcomeBack': 'वापसी पर स्वागत',
    'todaysGoal': 'आज का लक्ष्य',
    'weeklyProgress': 'साप्ताहिक प्रगति',
    'recentActivity': 'हाल की गतिविधि',
    
    // Lessons
    'allLessons': 'सभी पाठ',
    'completedLessons': 'पूर्ण',
    'inProgress': 'प्रगति में',
    
    // Challenges
    'activeChallenge': 'सक्रिय चुनौतियां',
    'completedChallenge': 'पूर्ण',
    'joinChallenge': 'चुनौती में शामिल हों',
    
    // School selection
    'selectSchool': 'अपना स्कूल चुनें',
    'schoolType': 'स्कूल का प्रकार',
    'rural': 'ग्रामीण',
    'urban': 'शहरी',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};