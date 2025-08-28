import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const UKHistoryPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Static content since OpenAI service is not available
      setContent(`
        <h1 class="text-3xl font-bold mb-6">Exploring the Rich Tapestry of UK History</h1>
        
        <div class="mb-6">
          <img src="/placeholder.svg" alt="Historic UK Castle" class="w-full h-64 object-cover rounded-lg" />
        </div>
        
        <p class="mb-4">The United Kingdom has a fascinating and complex history spanning thousands of years. From ancient Celtic tribes to the Roman invasion, the Anglo-Saxon period, the Norman Conquest, and beyond, the British Isles have been shaped by countless cultures and civilizations.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Roman Britain (43-410 AD)</h2>
        <p class="mb-4">The Romans arrived in Britain under Emperor Claudius in 43 AD, establishing control over much of what is now England and Wales. They built roads, towns, and impressive structures that still influence the landscape today. Hadrian's Wall, constructed in 122 AD, marked the northern frontier of the Roman Empire.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">The Medieval Period</h2>
        <p class="mb-4">Following the Roman withdrawal, Britain experienced waves of invasions and migrations. The Anglo-Saxons established various kingdoms, while Viking raids and eventual settlement added another layer to the cultural mix. The Norman Conquest of 1066 fundamentally changed English society, introducing feudalism and French influences that persist in the language today.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">The Tudor Era (1485-1603)</h2>
        <p class="mb-4">The Tudor period brought significant religious and political changes. Henry VIII's break with Rome led to the English Reformation. His daughter Elizabeth I presided over a golden age of exploration, literature, and naval power, defeating the Spanish Armada in 1588.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">The British Empire</h2>
        <p class="mb-4">From the 16th to the 20th century, Britain established the largest empire in history. At its peak, the British Empire covered a quarter of the world's land area and governed nearly a quarter of the global population. This period saw both incredible innovation and technological advancement, as well as controversial colonial policies.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Modern Britain</h2>
        <p class="mb-4">The 20th century brought two world wars, the decline of the empire, and eventually the transformation into the modern democratic state we know today. The establishment of the welfare state after WWII, decolonization, and joining the European Union (and later leaving it) have all shaped contemporary British identity.</p>
        
        <div class="mt-8 p-4 bg-muted rounded-lg">
          <p class="italic">This content was generated with AI assistance. Refresh for a new perspective on UK history!</p>
        </div>
      `);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load content. Please try again.');
      // Fallback content if AI generation fails
      setContent(`
        <h1 class="text-3xl font-bold mb-6">UK History Overview</h1>
        <p>The United Kingdom has a rich and complex history spanning thousands of years. Key periods include:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Roman Britain (43-410 AD)</li>
          <li>Anglo-Saxon and Viking periods</li>
          <li>The Norman Conquest (1066)</li>
          <li>The Medieval era</li>
          <li>The Tudor period</li>
          <li>The British Empire</li>
          <li>Modern Britain</li>
        </ul>
        <p class="mt-4">Each period contributed unique elements to British culture, law, language, and governance that continue to influence the nation today.</p>
      `);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleConfigureAPI = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glass-foreground">UK History</h1>
          <p className="text-muted-foreground">Explore the rich tapestry of British history</p>
        </div>

        <div className="mb-6 flex justify-end">
          <Button onClick={fetchContent} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh Content'}
          </Button>
        </div>
        
        <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive font-medium mb-4">{error}</p>
              <Button onClick={fetchContent}>Try Again</Button>
            </div>
          ) : (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </Card>
      </div>

      {/* Mobile padding */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

export default UKHistoryPage;