import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const UKEconomicsPage: React.FC = () => {
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
        <h1 class="text-3xl font-bold mb-6">The UK Economy: A Global Financial Powerhouse</h1>
        
        <div class="mb-6">
          <img src="/placeholder.svg" alt="London Financial District" class="w-full h-64 object-cover rounded-lg" />
        </div>
        
        <p class="mb-4">The United Kingdom boasts one of the world's largest economies and serves as a major global financial center. With London ranking among the top financial hubs globally, the UK economy combines traditional industries with cutting-edge technology and innovation.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Economic Overview</h2>
        <p class="mb-4">As the fifth-largest economy globally by nominal GDP, the UK has a highly developed market economy. The service sector dominates, contributing approximately 80% of GDP, with banking, insurance, and business services being particularly significant. Manufacturing accounts for about 10% of GDP, while agriculture contributes a smaller portion.</p>
        
        <p class="mb-4">The pound sterling (GBP) is one of the world's most traded currencies, and the Bank of England serves as the central bank responsible for monetary policy. The UK maintains a mixed economy with both private enterprise and government involvement in key sectors.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Key Industries</h2>
        <p class="mb-4">Financial services represent the cornerstone of the UK economy, with London hosting the London Stock Exchange and numerous international banks. The City of London is a global leader in foreign exchange trading, insurance, and asset management.</p>
        
        <p class="mb-4">Creative industries, including film, television, music, and digital media, have become increasingly important economic drivers. The UK is home to some of the world's leading advertising agencies, design firms, and video game developers.</p>
        
        <p class="mb-4">Manufacturing remains significant despite its reduced share of GDP. Key sectors include aerospace, automotive, pharmaceuticals, and chemicals. The UK is a major producer of vaccines and medicines, with several global pharmaceutical companies headquartered there.</p>
        
        <p class="mb-4">The tech sector has experienced rapid growth, with London and other cities becoming centers for fintech, artificial intelligence, and green technology startups. The government has implemented initiatives to support innovation and research and development.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Trade and Investment</h2>
        <p class="mb-4">The UK is a major trading nation with strong connections to both European and global markets. Services exports, particularly financial services, account for a significant portion of total exports. Major trading partners include the United States, Germany, France, and China.</p>
        
        <p class="mb-4">Following Brexit, the UK has been negotiating new trade agreements with countries worldwide. The economy has shown resilience, though trade relationships continue to evolve. Foreign direct investment remains robust, with the UK attracting multinational corporations across various sectors.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Economic Challenges</h2>
        <p class="mb-4">Like many advanced economies, the UK faces challenges including productivity growth, regional inequality, and skills shortages. The North-South divide reflects economic disparities between London and the South East compared to other regions.</p>
        
        <p class="mb-4">Climate change and the transition to a low-carbon economy present both challenges and opportunities. The government has committed to achieving net-zero carbon emissions by 2050, requiring significant investment in renewable energy and green technologies.</p>
        
        <p class="mb-4">Housing affordability, particularly in London and the South East, has become a pressing concern. Population growth and limited housing supply have driven up prices, creating challenges for younger generations.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Future Outlook</h2>
        <p class="mb-4">The UK economy continues to adapt to post-Brexit realities while navigating global economic uncertainties. Investments in infrastructure, education, and innovation aim to boost productivity and competitiveness.</p>
        
        <p class="mb-4">The green economy represents a significant growth opportunity, with potential for job creation in renewable energy, electric vehicles, and sustainable technologies. Digital transformation across industries is expected to drive efficiency and new business models.</p>
        
        <div class="mt-8 p-4 bg-muted rounded-lg">
          <p class="italic">This content was generated with AI assistance. Refresh for a new perspective on UK economics!</p>
        </div>
      `);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load content. Please try again.');
      setContent(`
        <h1 class="text-3xl font-bold mb-6">UK Economics Overview</h1>
        <p>Key aspects of the UK economy:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Fifth-largest economy globally by nominal GDP</li>
          <li>Service sector contributes ~80% of GDP</li>
          <li>London is a major global financial center</li>
          <li>Strong creative and technology industries</li>
          <li>Important manufacturing base</li>
          <li>Major exporter of services</li>
        </ul>
        <p class="mt-4">The economy faces challenges like productivity growth and regional inequality while pursuing green transition opportunities.</p>
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
    <div className="min-h-screen animate-fade-in">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glass-foreground">UK Economics</h1>
          <p className="text-muted-foreground">Explore the economic landscape of the United Kingdom</p>
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

export default UKEconomicsPage;