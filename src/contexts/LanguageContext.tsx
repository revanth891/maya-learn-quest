import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de' | 'sw'; // English, German, Swahili

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  nativeLanguage: Language;
  setNativeLanguage: (lang: Language) => void;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    lessons: 'Lessons',
    profile: 'Profile',
    settings: 'Settings',
    leaderboard: 'Leaderboard',
    
    // Welcome & Hero
    welcome: 'Welcome to MayaQuest',
    heroTitle: 'Master UK English with AI',
    heroSubtitle: 'Join millions learning English with our intelligent tutoring system',
    startLearning: 'Start Learning',
    continueJourney: 'Continue Journey',
    
    // Language Selection
    selectLanguage: 'Select Your Native Language',
    german: 'German',
    swahili: 'Swahili',
    english: 'English',
    
    // Gamification
    points: 'Integration Points',
    level: 'Level',
    streak: 'Day Streak',
    achievements: 'Achievements',
    totalPoints: 'Total Points',
    
    // Lessons
    beginnerLessons: 'Beginner Lessons',
    intermediateLessons: 'Intermediate Lessons',
    advancedLessons: 'Advanced Lessons',
    lessonComplete: 'Lesson Complete!',
    earnedPoints: 'You earned {{points}} IP!',
    
    // Profile
    yourProgress: 'Your Progress',
    weeklyGoal: 'Weekly Goal',
    currentStreak: 'Current Streak',
    totalLessons: 'Total Lessons',
    
    // Settings
    changeLanguage: 'Change Language',
    notifications: 'Notifications',
    soundEffects: 'Sound Effects',
    openaiApiKey: 'OpenAI API Key',
    apiKeyPlaceholder: 'Enter your OpenAI API key for AI lessons',
    saveSettings: 'Save Settings',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    back: 'Back',
    next: 'Next',
    complete: 'Complete',
    skip: 'Skip'
  },
  de: {
    // Navigation
    home: 'Startseite',
    lessons: 'Lektionen',
    profile: 'Profil',
    settings: 'Einstellungen',
    leaderboard: 'Bestenliste',
    
    // Welcome & Hero
    welcome: 'Willkommen bei MayaQuest',
    heroTitle: 'Meistere UK Englisch mit KI',
    heroSubtitle: 'Schließe dich Millionen an, die Englisch mit unserem intelligenten Tutoring-System lernen',
    startLearning: 'Lernen beginnen',
    continueJourney: 'Reise fortsetzen',
    
    // Language Selection
    selectLanguage: 'Wähle deine Muttersprache',
    german: 'Deutsch',
    swahili: 'Suaheli',
    english: 'Englisch',
    
    // Gamification
    points: 'Integrationspunkte',
    level: 'Level',
    streak: 'Tage-Serie',
    achievements: 'Erfolge',
    totalPoints: 'Gesamtpunkte',
    
    // Lessons
    beginnerLessons: 'Anfänger Lektionen',
    intermediateLessons: 'Fortgeschrittene Lektionen',
    advancedLessons: 'Experten Lektionen',
    lessonComplete: 'Lektion abgeschlossen!',
    earnedPoints: 'Du hast {{points}} IP verdient!',
    
    // Profile
    yourProgress: 'Dein Fortschritt',
    weeklyGoal: 'Wochenziel',
    currentStreak: 'Aktuelle Serie',
    totalLessons: 'Gesamte Lektionen',
    
    // Settings
    changeLanguage: 'Sprache ändern',
    notifications: 'Benachrichtigungen',
    soundEffects: 'Soundeffekte',
    openaiApiKey: 'OpenAI API Schlüssel',
    apiKeyPlaceholder: 'Gib deinen OpenAI API Schlüssel für KI-Lektionen ein',
    saveSettings: 'Einstellungen speichern',
    
    // Common
    loading: 'Laden...',
    error: 'Fehler',
    retry: 'Wiederholen',
    back: 'Zurück',
    next: 'Weiter',
    complete: 'Fertig',
    skip: 'Überspringen'
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
    lessons: 'Masomo',
    profile: 'Wasifu',
    settings: 'Mipangilio',
    leaderboard: 'Jedwali la Ushindi',
    
    // Welcome & Hero
    welcome: 'Karibu MayaQuest',
    heroTitle: 'Jifunze Kiingereza cha UK na AI',
    heroSubtitle: 'Jiunge na mamilioni wanaojifunza Kiingereza na mfumo wetu wa kufundisha akili',
    startLearning: 'Anza Kujifunza',
    continueJourney: 'Endelea na Safari',
    
    // Language Selection
    selectLanguage: 'Chagua Lugha Yako ya Asili',
    german: 'Kijerumani',
    swahili: 'Kiswahili',
    english: 'Kiingereza',
    
    // Gamification
    points: 'Alama za Ujumuishaji',
    level: 'Kiwango',
    streak: 'Mfuatano wa Siku',
    achievements: 'Mafanikio',
    totalPoints: 'Jumla ya Alama',
    
    // Lessons
    beginnerLessons: 'Masomo ya Wanaoanza',
    intermediateLessons: 'Masomo ya Kati',
    advancedLessons: 'Masomo ya Juu',
    lessonComplete: 'Somo Limekamilika!',
    earnedPoints: 'Umepata {{points}} IP!',
    
    // Profile
    yourProgress: 'Maendeleo Yako',
    weeklyGoal: 'Lengo la Wiki',
    currentStreak: 'Mfuatano wa Sasa',
    totalLessons: 'Jumla ya Masomo',
    
    // Settings
    changeLanguage: 'Badilisha Lugha',
    notifications: 'Arifa',
    soundEffects: 'Athari za Sauti',
    openaiApiKey: 'Ufunguo wa OpenAI API',
    apiKeyPlaceholder: 'Ingiza ufunguo wako wa OpenAI API kwa masomo ya AI',
    saveSettings: 'Hifadhi Mipangilio',
    
    // Common
    loading: 'Inapakia...',
    error: 'Hitilafu',
    retry: 'Jaribu Tena',
    back: 'Rudi',
    next: 'Ifuatayo',
    complete: 'Kamili',
    skip: 'Ruka'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [nativeLanguage, setNativeLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('mayaquest-language') as Language;
    const savedNative = localStorage.getItem('mayaquest-native-language') as Language;
    
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
    if (savedNative && translations[savedNative]) {
      setNativeLanguage(savedNative);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('mayaquest-language', lang);
  };

  const handleSetNativeLanguage = (lang: Language) => {
    setNativeLanguage(lang);
    localStorage.setItem('mayaquest-native-language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        nativeLanguage,
        setNativeLanguage: handleSetNativeLanguage,
        t 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};