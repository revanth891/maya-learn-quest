// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/button';
// import Navigation from '../components/Navigation';
// import { ProgressCard } from '../components/ui/progress-card';
// import { FeatureCard } from '../components/ui/feature-card';
// import { MayaContainer } from '../components/ui/maya-container';
// import { useLanguage } from '../contexts/LanguageContext';
// import { useGame } from '../contexts/GameContext';
// import { BookOpen, Target, CalendarDays, Award, Sparkles, ArrowRight } from 'lucide-react';
// import { Card } from '../components/ui/card';
// import Maya3D from '../components/Maya3D';

// const Home: React.FC = () => {
//   const { t, nativeLanguage } = useLanguage();
//   const { points, level, streak, updateStreak, getLevelProgress, getPointsForNextLevel } = useGame();

//   useEffect(() => {
//     updateStreak();
//   }, [updateStreak]);

//   const dailyGoal = 50; // points
//   const todayProgress = Math.min((points % 100), dailyGoal);

//   return (
//     <div className="min-h-screen bg-gradient-surface">
//       <Navigation />
      
//       {/* Hero Section */}
//       <section className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-8 items-center">
//           <div className="space-y-6">
//             <div className="space-y-4">
//               <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
//                 <span className="bg-gradient-primary bg-clip-text text-transparent">
//                   {t('heroTitle')}
//                 </span>
//               </h1>
//               <p className="text-xl text-muted-foreground leading-relaxed">
//                 {t('heroSubtitle')}
//               </p>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button 
//                 variant="glossy" 
//                 size="lg" 
//                 asChild
//                 className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//               >
//                 <Link to="/lessons" className="flex items-center space-x-2">
//                   <BookOpen className="w-5 h-5" />
//                   <span>{points > 0 ? t('continueJourney') : t('startLearning')}</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </Link>
//               </Button>
              
//               {nativeLanguage === 'en' && (
//                 <Button variant="premium" size="lg" asChild className="hover:scale-105 transition-transform">
//                   <Link to="/language-select" className="flex items-center space-x-2">
//                     <Sparkles className="w-5 h-5" />
//                     <span>{t('selectLanguage')}</span>
//                   </Link>
//                 </Button>
//               )}
//             </div>
//           </div>

//           {/* Maya 3D Mascot */}
//           <div className="flex justify-center lg:justify-end">
//           <Card className="relative p-4 card-premium w-[550px] h-[550px] lg:w-[650px] lg:h-[650px] flex items-center justify-center">
//                   <Maya3D 
//                     height="100%" 
//                     showMessage={true}
//                     message="Hello! I'm Maya, your AI English tutor. Ready to start your learning journey?"
//                     className="w-full h-full"
//                   />
//                 </Card>
//           </div>
//         </div>
//       </section>

//       {/* Progress Dashboard */}
//       <section className="px-4 max-w-7xl mx-auto mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <ProgressCard
//             title={`${t('level')} ${level}`}
//             value={getLevelProgress()}
//             maxValue={100}
//             description={`${getPointsForNextLevel()} IP to next level`}
//             icon={<Target className="w-5 h-5" />}
//             variant="primary"
//           />

//           <ProgressCard
//             title="Daily Goal"
//             value={todayProgress}
//             maxValue={dailyGoal}
//             description="IP earned today"
//             icon={<CalendarDays className="w-5 h-5" />}
//             variant="success"
//           />

//           <ProgressCard
//             title={`${streak} ${t('streak')}`}
//             value={Math.min(streak, 30)}
//             maxValue={30}
//             description="Keep it up!"
//             icon={<span className="text-xl">🔥</span>}
//             variant="warning"
//           />

//           <ProgressCard
//             title={`${points} IP`}
//             value={points}
//             maxValue={Math.max(points, 1000)}
//             description={t('totalPoints')}
//             icon={<Award className="w-5 h-5" />}
//             variant="default"
//           />
//         </div>
//       </section>

//       {/* Quick Actions */}
//       <section className="px-4 max-w-7xl mx-auto mb-16">
//         <h2 className="text-2xl font-bold text-foreground mb-6">Quick Start</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <FeatureCard
//             title={t('beginnerLessons')}
//             description="Start with basic English vocabulary and grammar"
//             icon={<BookOpen className="w-8 h-8" />}
//             variant="vibrant"
//             onClick={() => {}}
//           />

//           <FeatureCard
//             title={t('yourProgress')}
//             description="Track your learning journey and achievements"
//             icon={<Target className="w-8 h-8" />}
//             variant="vibrant"
//             onClick={() => {}}
//           />

//           <FeatureCard
//             title={t('leaderboard')}
//             description="Compare your progress with other learners"
//             icon={<Award className="w-8 h-8" />}
//             variant="vibrant"
//             onClick={() => {}}
//           />
//         </div>
//       </section>

//       {/* Mobile padding for bottom nav */}
//       <div className="pb-20 md:pb-8"></div>
//     </div>
//   );
// };

// export default Home;




import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Navigation from '../components/Navigation';
import { ProgressCard } from '../components/ui/progress-card';
import { FeatureCard } from '../components/ui/feature-card';
import { Card } from '../components/ui/card';
import Maya3D from '../components/Maya3D';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';
import { BookOpen, Target, CalendarDays, Award, Sparkles, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { t, nativeLanguage } = useLanguage();
  const { points, level, streak, updateStreak, getLevelProgress, getPointsForNextLevel } = useGame();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const dailyGoal = 50; // points
  const todayProgress = Math.min((points % 100), dailyGoal);

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4 max-w-7xl mx-auto">
  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center">
    
    {/* Hero Text */}
    <div className="space-y-6 text-center lg:text-left">
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            {t('heroTitle')}
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed px-2 sm:px-0">
          {t('heroSubtitle')}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
        <Button 
          variant="glossy" 
          size="lg" 
          asChild
          className="w-full sm:w-auto"
        >
          <Link to="/lessons" className="flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span>{points > 0 ? t('continueJourney') : t('startLearning')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>

        {nativeLanguage === 'en' && (
          <Button 
            variant="premium" 
            size="lg" 
            asChild 
            className="w-full sm:w-auto"
          >
            <Link to="/language-select" className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>{t('selectLanguage')}</span>
            </Link>
          </Button>
        )}
      </div>
    </div>

    {/* Maya 3D */}
    <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
      <Card className="relative p-2 sm:p-4 card-premium w-full max-w-[400px] sm:max-w-[400px] lg:max-w-[550px] aspect-square flex items-center justify-center">
        <Maya3D 
          height="100%" 
          showMessage={true}
          message="Hello! I'm Maya, your AI English tutor. Ready to start your learning journey?"
          className="w-full h-full"
        />
      </Card>
    </div>
  </div>
</section>


      {/* Progress Dashboard */}
      <section className="px-4 max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProgressCard
            title={`${t('level')} ${level}`}
            value={getLevelProgress()}
            maxValue={100}
            description={`${getPointsForNextLevel()} IP to next level`}
            icon={<Target className="w-5 h-5" />}
            variant="primary"
          />

          <ProgressCard
            title="Daily Goal"
            value={todayProgress}
            maxValue={dailyGoal}
            description="IP earned today"
            icon={<CalendarDays className="w-5 h-5" />}
            variant="success"
          />

          <ProgressCard
            title={`${streak} ${t('streak')}`}
            value={Math.min(streak, 30)}
            maxValue={30}
            description="Keep it up!"
            icon={<span className="text-xl">🔥</span>}
            variant="warning"
          />

          <ProgressCard
            title={`${points} IP`}
            value={points}
            maxValue={Math.max(points, 1000)}
            description={t('totalPoints')}
            icon={<Award className="w-5 h-5" />}
            variant="default"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 max-w-7xl mx-auto mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center sm:text-left">
          Quick Start
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title={t('beginnerLessons')}
            description="Start with basic English vocabulary and grammar"
            icon={<BookOpen className="w-8 h-8" />}
            variant="vibrant"
            onClick={() => {}}
          />

          <FeatureCard
            title={t('yourProgress')}
            description="Track your learning journey and achievements"
            icon={<Target className="w-8 h-8" />}
            variant="vibrant"
            onClick={() => {}}
          />

          <FeatureCard
            title={t('leaderboard')}
            description="Compare your progress with other learners"
            icon={<Award className="w-8 h-8" />}
            variant="vibrant"
            onClick={() => {}}
          />
        </div>
      </section>

      {/* Mobile padding for bottom nav */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

export default Home;
