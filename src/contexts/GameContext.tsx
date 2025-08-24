import React, { createContext, useContext, useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface GameContextType {
  points: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  addPoints: (amount: number) => void;
  updateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  getPointsForNextLevel: () => number;
  getLevelProgress: () => number;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🌟',
    unlocked: false
  },
  {
    id: 'week_streak',
    title: 'Dedicated Learner',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'hundred_points',
    title: 'Point Collector',
    description: 'Earn 100 Integration Points',
    icon: '💎',
    unlocked: false
  },
  {
    id: 'level_five',
    title: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'perfect_week',
    title: 'Perfectionist',
    description: 'Complete all daily goals for a week',
    icon: '👑',
    unlocked: false
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  // Load saved game data
  useEffect(() => {
    const savedData = localStorage.getItem('mayaquest-game-data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setPoints(data.points || 0);
        setLevel(data.level || 1);
        setStreak(data.streak || 0);
        setAchievements(data.achievements || initialAchievements);
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    }
  }, []);

  // Save game data whenever state changes
  useEffect(() => {
    const gameData = {
      points,
      level,
      streak,
      achievements
    };
    localStorage.setItem('mayaquest-game-data', JSON.stringify(gameData));
  }, [points, level, streak, achievements]);

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    
    // Calculate new level (100 points per level)
    const newLevel = Math.floor(newPoints / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      // Check for level achievements
      if (newLevel === 5) {
        unlockAchievement('level_five');
      }
    }

    // Check for point achievements
    if (newPoints >= 100 && !achievements.find(a => a.id === 'hundred_points')?.unlocked) {
      unlockAchievement('hundred_points');
    }
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem('mayaquest-last-active');
    
    if (lastActive === today) {
      return; // Already updated today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastActive === yesterday.toDateString()) {
      // Continue streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      if (newStreak === 7) {
        unlockAchievement('week_streak');
      }
    } else {
      // Reset streak
      setStreak(1);
    }
    
    localStorage.setItem('mayaquest-last-active', today);
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      )
    );
  };

  const getPointsForNextLevel = () => {
    return (level * 100) - points;
  };

  const getLevelProgress = () => {
    const pointsInCurrentLevel = points % 100;
    return (pointsInCurrentLevel / 100) * 100;
  };

  return (
    <GameContext.Provider value={{
      points,
      level,
      streak,
      achievements,
      addPoints,
      updateStreak,
      unlockAchievement,
      getPointsForNextLevel,
      getLevelProgress
    }}>
      {children}
    </GameContext.Provider>
  );
};