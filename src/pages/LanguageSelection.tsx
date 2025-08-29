import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import Maya3D from '../components/Maya3D';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { ArrowLeft, Globe } from 'lucide-react';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();
  const { t, setLanguage, setNativeLanguage } = useLanguage();

  const languages = [
    {
      code: 'de' as Language,
      name: 'Deutsch',
      englishName: 'German',
      flag: '🇩🇪',
      description: 'Lernen Sie Englisch auf Deutsch'
    },
    {
      code: 'sw' as Language,
      name: 'Kiswahili',
      englishName: 'Swahili',
      flag: '🇹🇿',
      description: 'Jifunze Kiingereza kwa Kiswahili'
    },
    {
      code: 'en' as Language,
      name: 'English',
      englishName: 'English',
      flag: '🇬🇧',
      description: 'Advanced English practice'
    }
  ];

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setNativeLanguage(langCode);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Language Selection */}
          <div className="space-y-6">
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Globe className="w-8 h-8 text-primary" />
                <h1 className="text-3xl lg:text-4xl font-bold text-glass-foreground">
                  {t('selectLanguage')}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Choose your native language to personalize your English learning experience
              </p>
            </div>

            <div className="space-y-4">
              {languages.map((lang) => (
                <Card
                  key={lang.code}
                  className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border hover:bg-glass/30 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{lang.flag}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-glass-foreground group-hover:text-primary transition-colors">
                        {lang.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {lang.englishName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lang.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm">
                        Select →
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground">
                You can change this later in settings
              </p>
            </div>
          </div>

          {/* Maya 3D Mascot */}
          <div className="flex justify">
            <div className="relative">
            <Card className="relative p-4 card-premium w-[550px] h-[550px] lg:w-[650px] lg:h-[650px] flex items-center justify-center">
                  <Maya3D 
                    height="100%" 
                    showMessage={true}
                    message="Hello! I'm Maya, your AI English tutor. Ready to start your learning journey?"
                    className="w-full h-full"
                  />
                </Card>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-glass/80 backdrop-blur-sm rounded-full px-4 py-2 border border-glass-border animate-bounce-in">
                  <span className="text-sm font-medium text-glass-foreground">
                    Maya is here to help!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
