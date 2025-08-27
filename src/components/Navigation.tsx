import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';
import { ThemeToggle } from './ThemeToggle';
import { House, BookOpen, UserRound, Settings, Trophy, Zap } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { points, level } = useGame();

  const navItems = [
    { path: '/', icon: House, label: t('home') },
    { path: '/lessons', icon: BookOpen, label: t('lessons') },
    { path: '/profile', icon: UserRound, label: t('profile') },
    { path: '/leaderboard', icon: Trophy, label: t('leaderboard') },
    { path: '/settings', icon: Settings, label: t('settings') },
  ];

  const ukItems = [
    { path: '/uk/history', label: 'History' },
    { path: '/uk/culture', label: 'Culture' },
    { path: '/uk/politics', label: 'Politics' },
    { path: '/uk/economics', label: 'Economics' },
    { path: '/uk/norms', label: 'Norms' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center animate-glow-pulse group-hover:scale-110 transition-transform">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
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
                  variant={isActive ? "glossy" : "ghost"}
                  size="sm"
                  asChild
                  className="text-sm transition-all duration-300 hover:scale-105"
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* UK Learning Dropdown */}
          <div className="hidden md:flex items-center">
            <div className="relative group">
              <Button variant="premium" size="sm" className="text-sm">
                Learn about UK
              </Button>
              <div className="absolute right-0 mt-1 w-48 glass backdrop-blur-xl border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  {ukItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-white/10 transition-colors rounded-md mx-1 my-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Points & Level */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass backdrop-blur-xl rounded-lg px-3 py-1 border border-white/20 hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-foreground">
                {points} IP
              </span>
            </div>
            <div className="flex items-center space-x-2 glass backdrop-blur-xl rounded-lg px-3 py-1 border border-white/20 hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-foreground">
                {t('level')} {level}
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass backdrop-blur-xl border-t border-white/20">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "glossy" : "ghost"}
                size="sm"
                asChild
                className="flex-col h-auto py-2 px-3 transition-all duration-300 hover:scale-105"
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