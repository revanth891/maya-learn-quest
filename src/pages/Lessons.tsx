import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Maya3D from '@/components/Maya3D';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { BookOpen, Star, Lock, Play, Trophy, Zap } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  exercises: number;
  completed: boolean;
  locked: boolean;
  progress: number;
}

const Lessons: React.FC = () => {
  const { t } = useLanguage();
  const { level } = useGame();

  const lessons: Lesson[] = [
    // Beginner Lessons
    {
      id: 'greetings',
      title: 'Greetings & Introductions',
      description: 'Learn how to say hello and introduce yourself in English',
      difficulty: 'beginner',
      points: 10,
      exercises: 5,
      completed: false,
      locked: false,
      progress: 0
    },
    {
      id: 'numbers',
      title: 'Numbers & Counting',
      description: 'Master numbers from 1 to 100 and basic counting',
      difficulty: 'beginner',
      points: 10,
      exercises: 6,
      completed: false,
      locked: false,
      progress: 0
    },
    {
      id: 'colors',
      title: 'Colors & Descriptions',
      description: 'Learn colors and basic descriptive adjectives',
      difficulty: 'beginner',
      points: 10,
      exercises: 4,
      completed: false,
      locked: false,
      progress: 0
    },
    
    // Intermediate Lessons
    {
      id: 'daily-routine',
      title: 'Daily Routines',
      description: 'Describe your daily activities and routines',
      difficulty: 'intermediate',
      points: 15,
      exercises: 7,
      completed: false,
      locked: level < 2,
      progress: 0
    },
    {
      id: 'shopping',
      title: 'Shopping & Money',
      description: 'Learn vocabulary for shopping and handling money',
      difficulty: 'intermediate',
      points: 15,
      exercises: 6,
      completed: false,
      locked: level < 2,
      progress: 0
    },
    {
      id: 'directions',
      title: 'Giving Directions',
      description: 'Ask for and give directions in English',
      difficulty: 'intermediate',
      points: 15,
      exercises: 5,
      completed: false,
      locked: level < 3,
      progress: 0
    },
    
    // Advanced Lessons
    {
      id: 'business',
      title: 'Business English',
      description: 'Professional communication and business vocabulary',
      difficulty: 'advanced',
      points: 20,
      exercises: 8,
      completed: false,
      locked: level < 5,
      progress: 0
    },
    {
      id: 'idioms',
      title: 'British Idioms',
      description: 'Learn common British expressions and idioms',
      difficulty: 'advanced',
      points: 20,
      exercises: 6,
      completed: false,
      locked: level < 5,
      progress: 0
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success';
      case 'intermediate': return 'text-warning';
      case 'advanced': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/20';
      case 'intermediate': return 'bg-warning/20';
      case 'advanced': return 'bg-destructive/20';
      default: return 'bg-muted/20';
    }
  };

  const groupedLessons = {
    beginner: lessons.filter(l => l.difficulty === 'beginner'),
    intermediate: lessons.filter(l => l.difficulty === 'intermediate'),
    advanced: lessons.filter(l => l.difficulty === 'advanced')
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-glass-foreground">{t('lessons')}</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Choose a lesson to start your English learning journey
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-glass/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-glass-border">
                <span className="text-sm font-medium text-glass-foreground">
                  {t('level')} {level}
                </span>
              </div>
              <div className="bg-glass/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-glass-border">
                <span className="text-sm font-medium text-glass-foreground">
                  {lessons.filter(l => !l.locked).length} lessons available
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <Maya3D 
              height="300px" 
              showMessage={true}
              message="Ready to learn? Pick a lesson that matches your level!"
              scale={0.8}
            />
          </div>
        </div>

        {/* Lesson Categories */}
        <div className="space-y-8">
          {/* Beginner Lessons */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-glass-foreground">{t('beginnerLessons')}</h2>
              <span className="text-sm text-muted-foreground">Perfect for getting started</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedLessons.beginner.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>

          {/* Intermediate Lessons */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-warning" />
              </div>
              <h2 className="text-2xl font-bold text-glass-foreground">{t('intermediateLessons')}</h2>
              <span className="text-sm text-muted-foreground">Build on your knowledge</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedLessons.intermediate.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>

          {/* Advanced Lessons */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-glass-foreground">{t('advancedLessons')}</h2>
              <span className="text-sm text-muted-foreground">Master advanced concepts</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedLessons.advanced.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Mobile padding */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

// Lesson Card Component
const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success';
      case 'intermediate': return 'text-warning';
      case 'advanced': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/20';
      case 'intermediate': return 'bg-warning/20';
      case 'advanced': return 'bg-destructive/20';
      default: return 'bg-muted/20';
    }
  };

  if (lesson.locked) {
    return (
      <Card className="p-6 bg-glass/10 backdrop-blur-sm border-glass-border opacity-60">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <span className={`px-2 py-1 rounded-full ${getDifficultyBg(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
              <span>•</span>
              <span>{lesson.points} IP</span>
              <span>•</span>
              <span>{lesson.exercises} exercises</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Level up to unlock</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border hover:bg-glass/30 transition-all duration-300 hover:scale-105 group">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className={`px-2 py-1 rounded-full ${getDifficultyBg(lesson.difficulty)}`}>
            <span className={`text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
              {lesson.difficulty}
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-glass-foreground mb-2 group-hover:text-primary transition-colors">
            {lesson.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
        </div>

        {lesson.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{lesson.progress}%</span>
            </div>
            <Progress value={lesson.progress} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>{lesson.points} IP</span>
            </span>
            <span>{lesson.exercises} exercises</span>
          </div>
          
          <Button variant="gaming" size="sm" asChild>
            <Link to={`/lessons/${lesson.id}`} className="flex items-center space-x-1">
              <Play className="w-3 h-3" />
              <span>Start</span>
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Lessons;