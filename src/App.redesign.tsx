import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { GameProvider } from './contexts/GameContext';
import { useTheme } from './hooks/useTheme';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import UKHistoryPage from './pages/uk/History';
import UKCulturePage from './pages/uk/Culture';
import UKPoliticsPage from './pages/uk/Politics';
import UKEconomicsPage from './pages/uk/Economics';
import UKNormsPage from './pages/uk/Norms';

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize theme
  useTheme();
  
  return (
    <div className="min-h-screen bg-gradient-surface">
      <BrowserRouter>
        <Routes>
          {/* Landing page - no navigation */}
          <Route path="/" element={<Landing />} />
          
          {/* Main app pages - with navigation */}
          <Route path="/app" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* UK Learning Routes */}
          <Route path="/uk/history" element={<UKHistoryPage />} />
          <Route path="/uk/culture" element={<UKCulturePage />} />
          <Route path="/uk/politics" element={<UKPoliticsPage />} />
          <Route path="/uk/economics" element={<UKEconomicsPage />} />
          <Route path="/uk/norms" element={<UKNormsPage />} />
          
          {/* Fallback route - redirect to home instead of landing */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const AppRedesign = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default AppRedesign;