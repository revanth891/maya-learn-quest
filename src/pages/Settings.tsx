import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Navigation from '../components/Navigation';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { Settings as SettingsIcon, Key, Bell, Volume2, Globe, Save, Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedApiKey = localStorage.getItem('mayaquest-openai-key');
    const savedNotifications = localStorage.getItem('mayaquest-notifications');
    const savedSoundEffects = localStorage.getItem('mayaquest-sound-effects');

    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedNotifications !== null) {
      setNotifications(savedNotifications === 'true');
    }
    if (savedSoundEffects !== null) {
      setSoundEffects(savedSoundEffects === 'true');
    }
  }, []);

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Save API key
      if (apiKey) {
        localStorage.setItem('mayaquest-openai-key', apiKey);
        alert("API Key Saved! OpenAI integration is now active for AI-powered lessons!");
      }

      // Save other settings
      localStorage.setItem('mayaquest-notifications', notifications.toString());
      localStorage.setItem('mayaquest-sound-effects', soundEffects.toString());

      alert("Settings saved successfully!");
    } catch (error) {
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-glass-foreground">{t('settings')}</h1>
          </div>
          <p className="text-muted-foreground">Customize your MayaQuest learning experience</p>
        </div>

        <div className="space-y-6">
          {/* OpenAI API Key Configuration */}
          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground">{t('openaiApiKey')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Required for AI-powered lessons and personalized feedback
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t('apiKeyPlaceholder')}
                    className="pr-10 bg-glass/30 border-glass-border"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Status: {apiKey ? (
                      <span className="text-success">✓ Connected</span>
                    ) : (
                      <span className="text-warning">⚠ Not configured</span>
                    )}
                  </p>
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    Get API Key →
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Language Settings */}
          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground">{t('changeLanguage')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language for the interface
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Interface Language</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                  <SelectTrigger className="bg-glass/30 border-glass-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground">{t('notifications')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your learning reminders and notifications
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Daily Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded to practice daily</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
          </Card>

          {/* Audio Settings */}
          <Card className="p-6 bg-glass/20 backdrop-blur-sm border-glass-border">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground">{t('soundEffects')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Control audio feedback and sound effects
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="soundEffects">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for correct answers and achievements</p>
                </div>
                <Switch
                  id="soundEffects"
                  checked={soundEffects}
                  onCheckedChange={setSoundEffects}
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              disabled={isLoading}
              variant="success"
              size="lg"
              className="px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : t('saveSettings')}
            </Button>
          </div>
        </div>

        {/* Setup Instructions */}
      </div>

      {/* Mobile padding */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

export default Settings;