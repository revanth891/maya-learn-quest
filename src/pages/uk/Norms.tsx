import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const UKNormsPage: React.FC = () => {
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
        <h1 class="text-3xl font-bold mb-6">Understanding UK Social Norms</h1>
        <p>British social norms are deeply ingrained cultural practices that guide everyday interactions:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Emphasis on politeness and saying "please" and "thank you"</li>
          <li>Respect for queuing and personal space</li>
          <li>Indirect communication style</li>
          <li>Importance of small talk and weather as conversation starter</li>
          <li>Pubs as central social venues</li>
          <li>Variations across regions and cultures</li>
        </ul>
        <p class="mt-4">These norms help facilitate smooth social interactions in British society.</p>
      `);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load content. Please try again.');
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
    <div className="min-h-screen animate-fade-in">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glass-foreground">UK Norms</h1>
          <p className="text-muted-foreground">Explore the social norms and cultural expectations in the United Kingdom</p>
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

export default UKNormsPage;