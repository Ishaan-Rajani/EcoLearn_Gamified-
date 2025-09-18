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
    
    // Quiz
    'environmentalQuiz': 'Environmental Quiz',
    'correct': 'Correct! +50 points 🎉',
    'incorrect': 'Incorrect',
    'nextQuestion': 'Next Question',
    'finishQuiz': 'Finish Quiz',
    'ecoPointsEarned': 'Eco Points Earned',
    'checkLeaderboard': 'Check Leaderboard',
    'tryAgain': 'Try Again',
    'leaderboardUpdated': 'Leaderboard Updated! 📈',
    'yourNewRank': 'Your New Rank:',
    'totalPoints': 'Total Points:',
    'top3Students': 'Top 3 Students:',
    'claimYourBadge': 'Claim Your Badge!',
    'viewRewards': 'View Rewards',
    'newBadgeEarned': 'New Badge Earned! 🏆',
    'congratulations': 'Congratulations! 🎉',
    'quizComplete': 'Quiz Complete!',
    'allDone': 'All Done!',
    
    // Quiz feedback messages
    'youCanStillTryAgain': 'You can still try again! 💪',
    'dontWorryLearning': "Don't worry, learning takes time. Review the material and try again!",
    'goodEffort': 'Good effort! 🌱',
    'onRightTrack': "You're on the right track! Keep learning and try again for a better score.",
    'wellDone': 'Well done! 🌟',
    'gettingHangOfIt': "Great job! You're getting the hang of it. Try for a perfect score next time!",
    'excellent': 'Excellent! 🎉',
    'outstandingWork': "Outstanding work! You've mastered this topic!",
    'perfect': 'Perfect! 🏆',
    'environmentalExpert': "Amazing! You got everything right! You're an environmental expert!",
    
    // Quiz questions
    'whichEnergyRenewable': 'Which energy source is renewable?',
    'coal': 'Coal',
    'solar': 'Solar',
    'oil': 'Oil',
    'naturalGas': 'Natural Gas',
    'solarExplanation': 'Solar energy is renewable because it comes from the sun which won\'t run out!',
    'plasticBottleDecompose': 'How long does a plastic bottle take to decompose?',
    'oneYear': '1 year',
    'tenYears': '10 years',
    'hundredYears': '100 years',
    'fourFiftyYears': '450 years',
    'plasticExplanation': 'Plastic bottles can take up to 450 years to decompose naturally!',
    'whatPercentageFreshWater': 'What percentage of Earth\'s water is fresh water?',
    'freshWaterExplanation': 'Only about 3% of Earth\'s water is fresh water that we can use!',
    
    // Navigation
    'navigation': 'Navigation',
    'teacherNavigation': 'Teacher Navigation',
    'home': 'Home',
    'dashboard': 'Dashboard',
    'lessons': 'Lessons',
    'challenges': 'Challenges',
    'leaderboard': 'Leaderboard',
    'rewards': 'Rewards',
    'manageStudents': 'Manage Students',
    'viewLessons': 'View Lessons',
    'manageChallenges': 'Manage Challenges',
    'studentLeaderboard': 'Student Leaderboard',
    'studentRewards': 'Student Rewards',
    
    // Accessibility
    'accessibility': 'Accessibility',
    'accessibilitySettings': 'Accessibility Settings',
    
    // Common actions
    'close': 'Close',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'save': 'Save',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'delete': 'Delete',
    'edit': 'Edit',
    'view': 'View',
    'manage': 'Manage',
    'settings': 'Settings',
    'profile': 'Profile',
    'logout': 'Logout',
    
    // Status messages
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'warning': 'Warning',
    'info': 'Info',
    'noData': 'No data available',
    'tryAgainLater': 'Please try again later',
    
    // Time references
    'now': 'Now',
    'today': 'Today',
    'yesterday': 'Yesterday',
    'thisWeek': 'This Week',
    'thisMonth': 'This Month',
    'thisYear': 'This Year',
    'ago': 'ago',
    'hoursAgo': 'hours ago',
    'daysAgo': 'days ago',
    'weeksAgo': 'weeks ago',
    'monthsAgo': 'months ago',
    'yearsAgo': 'years ago',
    'achievementsAdded': 'Your achievements have been added to your profile!',
    'quizComplete': 'Quiz Complete!',
    'allDone': 'All Done!',
    'students': 'Students',
    'analytics': 'Analytics',
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
    
    // Quiz
    'environmentalQuiz': 'पर्यावरणीय प्रश्नोत्तरी',
    'correct': 'सही! +50 अंक 🎉',
    'incorrect': 'गलत',
    'nextQuestion': 'अगला प्रश्न',
    'finishQuiz': 'प्रश्नोत्तरी समाप्त करें',
    'ecoPointsEarned': 'पारिस्थितिक अंक अर्जित',
    'checkLeaderboard': 'लीडरबोर्ड देखें',
    'tryAgain': 'फिर से कोशिश करें',
    'leaderboardUpdated': 'लीडरबोर्ड अपडेट! 📈',
    'yourNewRank': 'आपकी नई रैंक:',
    'totalPoints': 'कुल अंक:',
    'top3Students': 'शीर्ष 3 छात्र:',
    'claimYourBadge': 'अपना बैज प्राप्त करें!',
    'viewRewards': 'पुरस्कार देखें',
    'newBadgeEarned': 'नया बैज अर्जित! 🏆',
    'congratulations': 'बधाई हो! 🎉',
    'quizComplete': 'प्रश्नोत्तरी पूर्ण!',
    'allDone': 'सब कुछ हो गया!',
    
    // Quiz feedback messages
    'youCanStillTryAgain': 'आप अभी भी फिर से कोशिश कर सकते हैं! 💪',
    'dontWorryLearning': 'चिंता न करें, सीखने में समय लगता है। सामग्री की समीक्षा करें और फिर से कोशिश करें!',
    'goodEffort': 'अच्छा प्रयास! 🌱',
    'onRightTrack': 'आप सही रास्ते पर हैं! सीखते रहें और बेहतर स्कोर के लिए फिर से कोशिश करें।',
    'wellDone': 'बहुत बढ़िया! 🌟',
    'gettingHangOfIt': 'शानदार काम! आपको समझ आ रहा है। अगली बार पूर्ण स्कोर के लिए कोशिश करें!',
    'excellent': 'उत्कृष्ट! 🎉',
    'outstandingWork': 'शानदार काम! आपने इस विषय में महारत हासिल कर ली है!',
    'perfect': 'परफेक्ट! 🏆',
    'environmentalExpert': 'अद्भुत! आपने सब कुछ सही किया! आप एक पर्यावरण विशेषज्ञ हैं!',
    
    // Quiz questions
    'whichEnergyRenewable': 'कौन सा ऊर्जा स्रोत नवीकरणीय है?',
    'coal': 'कोयला',
    'solar': 'सौर',
    'oil': 'तेल',
    'naturalGas': 'प्राकृतिक गैस',
    'solarExplanation': 'सौर ऊर्जा नवीकरणीय है क्योंकि यह सूर्य से आती है जो कभी खत्म नहीं होगा!',
    'plasticBottleDecompose': 'प्लास्टिक की बोतल को विघटित होने में कितना समय लगता है?',
    'oneYear': '1 वर्ष',
    'tenYears': '10 वर्ष',
    'hundredYears': '100 वर्ष',
    'fourFiftyYears': '450 वर्ष',
    'plasticExplanation': 'प्लास्टिक की बोतलें प्राकृतिक रूप से विघटित होने में 450 वर्ष तक लग सकते हैं!',
    'whatPercentageFreshWater': 'पृथ्वी के कितने प्रतिशत पानी में ताजा पानी है?',
    'freshWaterExplanation': 'पृथ्वी के केवल लगभग 3% पानी में ताजा पानी है जिसका हम उपयोग कर सकते हैं!',
    
    // Navigation
    'navigation': 'नेविगेशन',
    'teacherNavigation': 'शिक्षक नेविगेशन',
    'home': 'होम',
    'dashboard': 'डैशबोर्ड',
    'lessons': 'पाठ',
    'challenges': 'चुनौतियां',
    'leaderboard': 'लीडरबोर्ड',
    'rewards': 'पुरस्कार',
    'manageStudents': 'छात्रों का प्रबंधन',
    'viewLessons': 'पाठ देखें',
    'manageChallenges': 'चुनौतियों का प्रबंधन',
    'studentLeaderboard': 'छात्र लीडरबोर्ड',
    'studentRewards': 'छात्र पुरस्कार',
    
    // Accessibility
    'accessibility': 'पहुंचता',
    'accessibilitySettings': 'पहुंचता सेटिंग्स',
    
    // Common actions
    'close': 'बंद करें',
    'back': 'वापस',
    'next': 'अगला',
    'previous': 'पिछला',
    'save': 'सहेजें',
    'cancel': 'रद्द करें',
    'confirm': 'पुष्टि करें',
    'delete': 'हटाएं',
    'edit': 'संपादित करें',
    'view': 'देखें',
    'manage': 'प्रबंधन',
    'settings': 'सेटिंग्स',
    'profile': 'प्रोफाइल',
    'logout': 'लॉगआउट',
    
    // Status messages
    'loading': 'लोड हो रहा है...',
    'error': 'त्रुटि',
    'success': 'सफलता',
    'warning': 'चेतावनी',
    'info': 'जानकारी',
    'noData': 'कोई डेटा उपलब्ध नहीं',
    'tryAgainLater': 'कृपया बाद में फिर से कोशिश करें',
    
    // Time references
    'now': 'अभी',
    'today': 'आज',
    'yesterday': 'कल',
    'thisWeek': 'इस सप्ताह',
    'thisMonth': 'इस महीने',
    'thisYear': 'इस साल',
    'ago': 'पहले',
    'hoursAgo': 'घंटे पहले',
    'daysAgo': 'दिन पहले',
    'weeksAgo': 'सप्ताह पहले',
    'monthsAgo': 'महीने पहले',
    'yearsAgo': 'साल पहले',
    'achievementsAdded': 'आपकी उपलब्धियां आपके प्रोफाइल में जोड़ दी गई हैं!',
    'quizComplete': 'प्रश्नोत्तरी पूर्ण!',
    'allDone': 'सब कुछ हो गया!',
    'students': 'छात्र',
    'analytics': 'विश्लेषण'
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