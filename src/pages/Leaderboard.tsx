import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Navigation from '../components/Navigation';
import Maya3D from '../components/Maya3D';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';
import { Trophy, Medal, Award, Crown, Zap, TrendingUp, Users, Calendar } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  country: string;
}

const Leaderboard: React.FC = () => {
  const { t } = useLanguage();
  const { points, level, streak } = useGame();
  const [selectedTab, setSelectedTab] = useState('weekly');

  // Mock leaderboard data
  const weeklyLeaders: LeaderboardUser[] = [
    { id: '1', name: 'Emma Schmidt', avatar: '👩', points: 2847, level: 12, streak: 28, country: '🇩🇪' },
    { id: '2', name: 'James Wilson', avatar: '👨', points: 2756, level: 11, streak: 25, country: '🇬🇧' },
    { id: '3', name: 'Amina Hassan', avatar: '👩‍🦱', points: 2698, level: 11, streak: 22, country: '🇹🇿' },
    { id: '4', name: 'Carlos Rodriguez', avatar: '👨‍🦲', points: 2654, level: 10, streak: 31, country: '🇪🇸' },
    { id: '5', name: 'Sarah Johnson', avatar: '👱‍♀️', points: 2587, level: 10, streak: 19, country: '🇺🇸' },
    { id: '6', name: 'Mohamed Ali', avatar: '👨‍🦳', points: 2534, level: 10, streak: 15, country: '🇪🇬' },
    { id: '7', name: 'Lisa Chen', avatar: '👩‍💼', points: 2489, level: 9, streak: 27, country: '🇨🇳' },
    { id: '8', name: 'Ahmed Patel', avatar: '👨‍💻', points: 2456, level: 9, streak: 18, country: '🇮🇳' }
  ];

  const allTimeLeaders: LeaderboardUser[] = [
    { id: '1', name: 'Emma Schmidt', avatar: '👩', points: 15847, level: 25, streak: 128, country: '🇩🇪' },
    { id: '2', name: 'Kenji Tanaka', avatar: '👨', points: 14756, level: 23, streak: 95, country: '🇯🇵' },
    { id: '3', name: 'Priya Sharma', avatar: '👩‍🦱', points: 13698, level: 22, streak: 87, country: '🇮🇳' },
    { id: '4', name: 'Marcus Johnson', avatar: '👨‍🦲', points: 12654, level: 21, streak: 76, country: '🇺🇸' },
    { id: '5', name: 'Anna Kowalski', avatar: '👱‍♀️', points: 11587, level: 20, streak: 65, country: '🇵🇱' }
  ];

  // Find current user position (mock)
  const currentUserPosition = 15;
  const currentUser: LeaderboardUser = {
    id: 'current',
    name: 'You',
    avatar: '🎓',
    points,
    level,
    streak,
    country: '🌟'
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-warning" />;
      case 2: return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getRankBg = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-warning/20 to-warning/10 border-warning/30';
      case 2: return 'bg-gradient-to-r from-muted/20 to-muted/10 border-muted/30';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-600/10 border-amber-600/30';
      default: return 'bg-glass/20 border-glass-border';
    }
  };

  const LeaderboardList: React.FC<{ users: LeaderboardUser[], showCurrentUser?: boolean }> = ({ 
    users, 
    showCurrentUser = false 
  }) => (
    <div className="space-y-3">
      {users.map((user, index) => {
        const position = index + 1;
        const isCurrentUser = user.id === 'current';
        
        return (
          <Card 
            key={user.id} 
            className={`p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
              isCurrentUser 
                ? 'bg-primary/20 border-primary shadow-glow' 
                : getRankBg(position)
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(position)}
              </div>
              
              {/* Avatar & Country */}
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{user.avatar}</div>
                <div className="text-lg">{user.country}</div>
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className={`font-semibold ${
                    isCurrentUser ? 'text-primary' : 'text-glass-foreground'
                  }`}>
                    {user.name}
                  </h3>
                  {isCurrentUser && (
                    <Badge variant="secondary" className="text-xs">You</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>Level {user.level}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🔥</span>
                    <span>{user.streak} days</span>
                  </span>
                </div>
              </div>
              
              {/* Points */}
              <div className="text-right">
                <div className={`text-xl font-bold ${
                  isCurrentUser ? 'text-primary' : 'text-glass-foreground'
                }`}>
                  {user.points.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">IP</div>
              </div>
            </div>
          </Card>
        );
      })}
      
      {/* Current User Position (if not in top list) */}
      {showCurrentUser && currentUserPosition > users.length && (
        <>
          <div className="text-center py-2">
            <span className="text-sm text-muted-foreground">...</span>
          </div>
          <Card className="p-4 bg-primary/20 backdrop-blur-sm border-primary shadow-glow">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8">
                <span className="text-sm font-bold text-primary">#{currentUserPosition}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{currentUser.avatar}</div>
                <div className="text-lg">{currentUser.country}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-primary">{currentUser.name}</h3>
                  <Badge variant="secondary" className="text-xs">You</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>Level {currentUser.level}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🔥</span>
                    <span>{currentUser.streak} days</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  {currentUser.points.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">IP</div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-8 h-8 text-warning" />
              <h1 className="text-3xl font-bold text-glass-foreground">{t('leaderboard')}</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              See how you compare with other English learners worldwide
            </p>
            
            {/* Current User Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-glass/20 backdrop-blur-sm border-glass-border text-center">
                <div className="text-lg font-bold text-primary">{points.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Your IP</div>
              </Card>
              <Card className="p-4 bg-glass/20 backdrop-blur-sm border-glass-border text-center">
                <div className="text-lg font-bold text-success">#{currentUserPosition}</div>
                <div className="text-xs text-muted-foreground">Your Rank</div>
              </Card>
              <Card className="p-4 bg-glass/20 backdrop-blur-sm border-glass-border text-center">
                <div className="text-lg font-bold text-warning">{level}</div>
                <div className="text-xs text-muted-foreground">Your Level</div>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <Maya3D 
              height="300px" 
              showMessage={true}
              message={`You're ranked #${currentUserPosition}! Keep learning to climb higher!`}
            />
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-glass/20 backdrop-blur-sm">
              <TabsTrigger value="weekly" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Weekly</span>
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Monthly</span>
              </TabsTrigger>
              <TabsTrigger value="alltime" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>All Time</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="weekly">
            <Card className="p-6 bg-glass/10 backdrop-blur-sm border-glass-border">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-glass-foreground">This Week's Leaders</h2>
              </div>
              <LeaderboardList users={weeklyLeaders} showCurrentUser={true} />
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="p-6 bg-glass/10 backdrop-blur-sm border-glass-border">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-glass-foreground">This Month's Leaders</h2>
              </div>
              <LeaderboardList users={weeklyLeaders} showCurrentUser={true} />
            </Card>
          </TabsContent>

          <TabsContent value="alltime">
            <Card className="p-6 bg-glass/10 backdrop-blur-sm border-glass-border">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-glass-foreground">All-Time Champions</h2>
              </div>
              <LeaderboardList users={allTimeLeaders} showCurrentUser={true} />
            </Card>
          </TabsContent>
        </Tabs>

        {/* Competition Info */}
        <Card className="mt-8 p-6 bg-glass/10 backdrop-blur-sm border-glass-border">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5 text-warning" />
              <h3 className="text-lg font-semibold text-glass-foreground">Weekly Competition</h3>
            </div>
            <p className="text-muted-foreground">
              Compete with learners worldwide! Complete lessons and earn Integration Points to climb the leaderboard.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-glass-foreground">6d 14h</div>
                <div className="text-muted-foreground">Time left</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-glass-foreground">2,847</div>
                <div className="text-muted-foreground">Leading score</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-glass-foreground">1,248</div>
                <div className="text-muted-foreground">Active learners</div>
              </div>
            </div>
            <Button variant="glossy" size="lg" className="mt-4">
              <Trophy className="w-4 h-4 mr-2" />
              Join Competition
            </Button>
          </div>
        </Card>
      </div>

      {/* Mobile padding */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

export default Leaderboard;