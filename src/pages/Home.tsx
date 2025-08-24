import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Maya3D from '@/components/Maya3D';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { BookOpen, Target, Calendar, Award, Sparkles, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { t, nativeLanguage } = useLanguage();
  const { points, level, streak, updateStreak, getLevelProgress, getPointsForNextLevel } = useGame();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const dailyGoal = 50; // points
  const todayProgress = Math.min((points % 100), dailyGoal);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-glass-foreground leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {t('heroTitle')}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                asChild
                className="shadow-glow hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/lessons" className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{points > 0 ? t('continueJourney') : t('startLearning')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              {nativeLanguage === 'en' && (
                <Button variant="glass" size="lg" asChild>
                  <Link to="/language-select" className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>{t('selectLanguage')}</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Maya 3D Mascot */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Maya3D 
                height="400px" 
                showMessage={true}
                message={points > 0 ? "Welcome back! Ready for more English?" : "Hello! I'm Maya, your AI English tutor!"}
                className="animate-float"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-glass/80 backdrop-blur-sm rounded-full px-4 py-2 border border-glass-border animate-bounce-in">
                  <span className="text-sm font-medium text-glass-foreground">
                    Maya - Your AI Tutor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Dashboard */}
      <section className="px-4 max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Level Progress */}
          <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border hover:bg-glass/40 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-glass-foreground">{t('level')} {level}</h3>
                <p className="text-sm text-muted-foreground">{getPointsForNextLevel()} IP to next level</p>
              </div>
            </div>
            <Progress value={getLevelProgress()} className="h-2" />
          </Card>

          {/* Daily Goal */}
          <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border hover:bg-glass/40 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-success-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-glass-foreground">Daily Goal</h3>
                <p className="text-sm text-muted-foreground">{todayProgress}/{dailyGoal} IP</p>
              </div>
            </div>
            <Progress value={(todayProgress / dailyGoal) * 100} className="h-2" />
          </Card>

          {/* Streak */}
          <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border hover:bg-glass/40 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h3 className="font-medium text-glass-foreground">{streak} {t('streak')}</h3>
                <p className="text-sm text-muted-foreground">Keep it up!</p>
              </div>
            </div>
          </Card>

          {/* Total Points */}
          <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border hover:bg-glass/40 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-glass-foreground">{points} IP</h3>
                <p className="text-sm text-muted-foreground">{t('totalPoints')}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-glass-foreground mb-6">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border hover:bg-glass/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <Link to="/lessons" className="block">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground mb-2">{t('beginnerLessons')}</h3>
                  <p className="text-sm text-muted-foreground">Start with basic English vocabulary and grammar</p>
                </div>
              </div>
            </Link>
          </Card>

          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border hover:bg-glass/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <Link to="/profile" className="block">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground mb-2">{t('yourProgress')}</h3>
                  <p className="text-sm text-muted-foreground">Track your learning journey and achievements</p>
                </div>
              </div>
            </Link>
          </Card>

          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border hover:bg-glass/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <Link to="/leaderboard" className="block">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground mb-2">{t('leaderboard')}</h3>
                  <p className="text-sm text-muted-foreground">Compare your progress with other learners</p>
                </div>
              </div>
            </Link>
          </Card>
        </div>
      </section>

      {/* Mobile padding for bottom nav */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

export default Home;