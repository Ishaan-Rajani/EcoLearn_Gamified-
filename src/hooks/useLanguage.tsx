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
    
    // Main page
    'ecoLearn': 'EcoLearn',
    'learnPlaySave': 'Learn • Play • Save Planet',
    'gamifiedEducation': 'Gamified Environmental Education',
    'mainDescription': 'Join thousands of students learning to protect our planet through interactive lessons and real-world challenges.',
    'interactiveLessons': 'Interactive Lessons',
    'realChallenges': 'Real Challenges',
    'earnRewards': 'Earn Rewards',
    'globalImpact': 'Global Impact',
    'startLearningNow': 'Start Learning Now',
    'studentDemo': 'Student Demo',
    'teacherDemo': 'Teacher Demo',
    'perfectForGrades': 'Perfect for grades 6-12 & colleges',
    'worksOffline': 'Works offline • Syncs when online',
    'availableInLanguages': 'Available in English & Hindi',
    'clickToLearnMore': 'Click to learn more',
    
    // Feature modal
    'howItWorks': 'How It Works',
    'whatYouGet': 'What You Get',
    'whyItMatters': 'Why It Matters',
    'gotItLetsStart': 'Got It! Let\'s Start Learning',
    
    // Lessons
    'lessonsDescription': 'Learn environmental science through engaging, interactive content',
    'startLearning': 'Start Learning',
    'watchVideos': 'Watch Videos',
    'takeQuizzes': 'Take Quizzes',
    'completeActivities': 'Complete Activities',
    'earnPoints': 'Earn Points',
    
    // Challenges
    'challengesDescription': 'Apply your knowledge in real-world environmental challenges',
    'joinChallenge': 'Join Challenge',
    'planAction': 'Plan Action',
    'takeAction': 'Take Action',
    'documentResults': 'Document Results',
    'shareImpact': 'Share Impact',
    
    // Rewards
    'rewardsDescription': 'Get recognized and rewarded for your environmental achievements',
    'completeTasks': 'Complete Tasks',
    'unlockBadges': 'Unlock Badges',
    'levelUp': 'Level Up',
    'getPrizes': 'Get Prizes',
    
    // Impact
    'impactDescription': 'See how your actions contribute to global environmental change',
    'yourAction': 'Your Action',
    'localImpact': 'Local Impact',
    'regionalChange': 'Regional Change',
    'globalMovement': 'Global Movement',
    'planetSaved': 'Planet Saved',
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
    
    // Main page
    'ecoLearn': 'इकोलर्न',
    'learnPlaySave': 'सीखें • खेलें • ग्रह बचाएं',
    'gamifiedEducation': 'गेमिफाइड पर्यावरणीय शिक्षा',
    'mainDescription': 'हजारों छात्रों के साथ जुड़ें जो इंटरैक्टिव पाठ और वास्तविक दुनिया की चुनौतियों के माध्यम से हमारे ग्रह की रक्षा करना सीख रहे हैं।',
    'interactiveLessons': 'इंटरैक्टिव पाठ',
    'realChallenges': 'वास्तविक चुनौतियां',
    'earnRewards': 'पुरस्कार कमाएं',
    'globalImpact': 'वैश्विक प्रभाव',
    'startLearningNow': 'अभी सीखना शुरू करें',
    'studentDemo': 'छात्र डेमो',
    'teacherDemo': 'शिक्षक डेमो',
    'perfectForGrades': 'कक्षा 6-12 और कॉलेजों के लिए आदर्श',
    'worksOffline': 'ऑफलाइन काम करता है • ऑनलाइन होने पर सिंक होता है',
    'availableInLanguages': 'अंग्रेजी और हिंदी में उपलब्ध',
    'clickToLearnMore': 'अधिक जानने के लिए क्लिक करें',
    
    // Feature modal
    'howItWorks': 'यह कैसे काम करता है',
    'whatYouGet': 'आपको क्या मिलता है',
    'whyItMatters': 'यह क्यों महत्वपूर्ण है',
    'gotItLetsStart': 'समझ गया! आइए सीखना शुरू करें',
    
    // Lessons
    'lessonsDescription': 'आकर्षक, इंटरैक्टिव सामग्री के माध्यम से पर्यावरण विज्ञान सीखें',
    'startLearning': 'सीखना शुरू करें',
    'watchVideos': 'वीडियो देखें',
    'takeQuizzes': 'क्विज़ लें',
    'completeActivities': 'गतिविधियां पूरी करें',
    'earnPoints': 'अंक कमाएं',
    
    // Challenges
    'challengesDescription': 'वास्तविक दुनिया की पर्यावरणीय चुनौतियों में अपने ज्ञान को लागू करें',
    'joinChallenge': 'चुनौती में शामिल हों',
    'planAction': 'कार्य योजना बनाएं',
    'takeAction': 'कार्य करें',
    'documentResults': 'परिणाम दस्तावेज करें',
    'shareImpact': 'प्रभाव साझा करें',
    
    // Rewards
    'rewardsDescription': 'अपनी पर्यावरणीय उपलब्धियों के लिए मान्यता और पुरस्कार प्राप्त करें',
    'completeTasks': 'कार्य पूरे करें',
    'unlockBadges': 'बैज अनलॉक करें',
    'levelUp': 'स्तर बढ़ाएं',
    'getPrizes': 'पुरस्कार प्राप्त करें',
    
    // Impact
    'impactDescription': 'देखें कि आपके कार्य वैश्विक पर्यावरणीय परिवर्तन में कैसे योगदान देते हैं',
    'yourAction': 'आपका कार्य',
    'localImpact': 'स्थानीय प्रभाव',
    'regionalChange': 'क्षेत्रीय परिवर्तन',
    'globalMovement': 'वैश्विक आंदोलन',
    'planetSaved': 'ग्रह बचाया',
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