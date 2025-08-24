import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { Home, BookOpen, User, Settings, Trophy, Zap } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { points, level } = useGame();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/lessons', icon: BookOpen, label: t('lessons') },
    { path: '/profile', icon: User, label: t('profile') },
    { path: '/leaderboard', icon: Trophy, label: t('leaderboard') },
    { path: '/settings', icon: Settings, label: t('settings') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass/20 backdrop-blur-md border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center animate-glow-pulse">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MayaQuest
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="text-sm"
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Points & Level */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-glass/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-glass-border">
              <Zap className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-glass-foreground">
                {points} IP
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-glass/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-glass-border">
              <Trophy className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-glass-foreground">
                {t('level')} {level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-glass/20 backdrop-blur-md border-t border-glass-border">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                asChild
                className="flex-col h-auto py-2 px-3"
              >
                <Link to={item.path} className="flex flex-col items-center space-y-1">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;