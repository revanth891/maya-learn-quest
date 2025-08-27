import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const UKCulturePage: React.FC = () => {
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
        <h1 class="text-3xl font-bold mb-6">Discovering the Rich Tapestry of UK Culture</h1>
        
        <div class="mb-6">
          <img src="/placeholder.svg" alt="British Cultural Scene" class="w-full h-64 object-cover rounded-lg" />
        </div>
        
        <p class="mb-4">British culture is a fascinating blend of tradition and modernity, shaped by centuries of history and influenced by waves of immigration. From the royal family to afternoon tea, from Shakespeare to the Beatles, UK culture has had a profound impact on the world.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Traditions and Customs</h2>
        <p class="mb-4">British traditions are deeply rooted in history and often reflect the country's monarchical past. Royal ceremonies, such as the Changing of the Guard at Buckingham Palace, attract visitors from around the globe. Traditional holidays like Bonfire Night (Guy Fawkes Night) on November 5th commemorate historical events with fireworks and community celebrations.</p>
        
        <p class="mb-4">Social customs in the UK emphasize politeness and courtesy. Queuing (standing in line) is considered an art form, and saying "please," "thank you," and "sorry" is second nature. The British are known for their dry sense of humor and self-deprecating wit, which plays a significant role in social interactions.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Food and Drink</h2>
        <p class="mb-4">British cuisine has evolved significantly over the past few decades. While traditional dishes like fish and chips, Sunday roast, and afternoon tea remain popular, the UK has embraced international flavors through its diverse immigrant communities. Indian curry houses, Italian restaurants, and Chinese takeaways are now integral parts of British dining culture.</p>
        
        <p class="mb-4">Tea remains central to British culture, with afternoon tea being a cherished ritual. The proper way to make tea, the etiquette of tea drinking, and the variety of teas available are all important aspects of British life. Pub culture is equally significant, serving as social hubs where people gather to enjoy good food, drinks, and conversation.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Arts and Literature</h2>
        <p class="mb-4">The UK has made immense contributions to world literature, with authors like William Shakespeare, Jane Austen, Charles Dickens, and J.K. Rowling shaping literary history. British literature often explores themes of class, identity, and social commentary, reflecting the complexities of British society.</p>
        
        <p class="mb-4">In music, the UK has produced legendary bands and artists who have influenced global popular culture. From The Beatles and The Rolling Stones to Adele and Ed Sheeran, British musicians have consistently topped international charts. The UK's festival scene, including Glastonbury and Reading, attracts hundreds of thousands of music lovers each year.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Sports and Recreation</h2>
        <p class="mb-4">Sport plays a vital role in British culture, with football (soccer) being the most popular. Cricket, rugby, tennis, and golf also have strong followings. The Wimbledon Tennis Championships and The Open Championship in golf are among the most prestigious sporting events worldwide. Participating in or watching sports is a common way for people to socialize and connect with others.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Regional Diversity</h2>
        <p class="mb-4">The UK is composed of four distinct countries—England, Scotland, Wales, and Northern Ireland—each with its own unique cultural identity. Scottish Highland Games, Welsh eisteddfodau (cultural festivals), Irish traditional music sessions, and English village fetes showcase the rich regional diversity within the UK.</p>
        
        <div class="mt-8 p-4 bg-muted rounded-lg">
          <p class="italic">This content was generated with AI assistance. Refresh for a new perspective on UK culture!</p>
        </div>
      `);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load content. Please try again.');
      setContent(`
        <h1 class="text-3xl font-bold mb-6">UK Culture Overview</h1>
        <p>British culture is characterized by:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>A strong emphasis on politeness and queuing</li>
          <li>Love of tea and pub culture</li>
          <li>Rich literary tradition</li>
          <li>Influential music scene</li>
          <li>Diverse regional identities</li>
          <li>Passion for sports</li>
        </ul>
        <p class="mt-4">These elements combine to create a unique cultural landscape that continues to evolve while maintaining its traditional roots.</p>
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
          <h1 className="text-4xl font-bold text-glass-foreground">UK Culture</h1>
          <p className="text-muted-foreground">Explore the rich cultural heritage of the United Kingdom</p>
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

export default UKCulturePage;