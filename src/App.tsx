import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { GameProvider } from "./contexts/GameContext";
import { useTheme } from "./hooks/useTheme";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import LanguageSelection from "./pages/LanguageSelection";
import NotFound from "./pages/NotFound";
import UKHistoryPage from "./pages/uk/History";
import UKCulturePage from "./pages/uk/Culture";
import UKPoliticsPage from "./pages/uk/Politics";
import UKEconomicsPage from "./pages/uk/Economics";
import UKNormsPage from "./pages/uk/Norms";

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize theme
  useTheme();
  
  return (
    <div className="min-h-screen">
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Home />} />
          <Route path="/language-select" element={<LanguageSelection />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          
          {/* UK Learning Routes */}
          <Route path="/uk/history" element={<UKHistoryPage />} />
          <Route path="/uk/culture" element={<UKCulturePage />} />
          <Route path="/uk/politics" element={<UKPoliticsPage />} />
          <Route path="/uk/economics" element={<UKEconomicsPage />} />
          <Route path="/uk/norms" element={<UKNormsPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <GameProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </GameProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
