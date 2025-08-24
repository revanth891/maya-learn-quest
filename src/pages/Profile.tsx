import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Maya3D from '@/components/Maya3D';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { User, Trophy, Target, Calendar, Award, Zap, TrendingUp, Star } from 'lucide-react';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { points, level, streak, achievements, getLevelProgress, getPointsForNextLevel } = useGame();

  const stats = [
    {
      icon: Zap,
      label: t('totalPoints'),
      value: points.toLocaleString(),
      color: 'text-warning',
      bgColor: 'bg-warning/20'
    },
    {
      icon: Trophy,
      label: t('level'),
      value: level.toString(),
      color: 'text-success',
      bgColor: 'bg-success/20'
    },
    {
      icon: Calendar,
      label: t('streak'),
      value: `${streak} days`,
      color: 'text-destructive',
      bgColor: 'bg-destructive/20'
    },
    {
      icon: Award,
      label: t('achievements'),
      value: achievements.filter(a => a.unlocked).length.toString(),
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    }
  ];

  const weeklyData = [
    { day: 'Mon', points: 45 },
    { day: 'Tue', points: 32 },
    { day: 'Wed', points: 58 },
    { day: 'Thu', points: 28 },
    { day: 'Fri', points: 62 },
    { day: 'Sat', points: 35 },
    { day: 'Sun', points: 48 }
  ];

  const maxWeeklyPoints = Math.max(...weeklyData.map(d => d.points));

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-glass-foreground">{t('profile')}</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Track your learning progress and achievements
            </p>
            
            {/* User Level Progress */}
            <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-glass-foreground">
                      {t('level')} {level}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getPointsForNextLevel()} IP to next level
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{Math.round(getLevelProgress())}%</div>
                    <div className="text-xs text-muted-foreground">Progress</div>
                  </div>
                </div>
                <Progress value={getLevelProgress()} className="h-3" />
              </div>
            </Card>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <Maya3D 
              height="300px" 
              showMessage={true}
              message={`Amazing progress! You're at level ${level} with ${points} Integration Points!`}
              scale={0.8}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-glass-foreground mb-6">{t('yourProgress')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border hover:bg-glass/30 transition-colors">
                  <div className="text-center space-y-3">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-glass-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Weekly Activity */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-glass-foreground mb-6">Weekly Activity</h2>
          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
            <div className="grid grid-cols-7 gap-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground font-medium">{day.day}</div>
                  <div className="relative">
                    <div className="h-24 bg-glass/30 rounded-lg flex items-end p-1">
                      <div 
                        className="w-full bg-gradient-primary rounded"
                        style={{ height: `${(day.points / maxWeeklyPoints) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-glass-foreground font-medium mt-1">
                      {day.points}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Total this week: {weeklyData.reduce((sum, day) => sum + day.points, 0)} IP
              </p>
            </div>
          </Card>
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-glass-foreground mb-6">{t('achievements')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-6 backdrop-blur-sm border transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-glass/30 border-success shadow-success hover:scale-105' 
                    : 'bg-glass/10 border-glass-border opacity-60'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl ${achievement.unlocked ? 'animate-bounce-in' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.unlocked ? 'text-glass-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    {achievement.unlocked ? (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Unlocked
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Insights */}
        <section>
          <h2 className="text-2xl font-bold text-glass-foreground mb-6">Learning Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-5 h-5 text-success" />
                <h3 className="text-lg font-semibold text-glass-foreground">Performance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Score</span>
                  <span className="font-medium text-glass-foreground">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lessons Completed</span>
                  <span className="font-medium text-glass-foreground">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Study Time</span>
                  <span className="font-medium text-glass-foreground">4.2 hrs</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-glass-foreground">Goals</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Daily Goal</span>
                    <span className="text-xs text-muted-foreground">24/50 IP</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Weekly Goal</span>
                    <span className="text-xs text-muted-foreground">308/350 IP</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* Mobile padding */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

export default Profile;