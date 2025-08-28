import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const UKPoliticsPage: React.FC = () => {
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
        <h1 class="text-3xl font-bold mb-6">Understanding the UK Political Landscape</h1>
        
        <div class="mb-6">
          <img src="/placeholder.svg" alt="UK Parliament" class="w-full h-64 object-cover rounded-lg" />
        </div>
        
        <p class="mb-4">The United Kingdom operates under a parliamentary democracy with a constitutional monarchy. This system balances the powers of the elected government with those of the monarch and other institutions. Understanding UK politics is essential for comprehending how decisions affecting millions of people are made every day.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">The Political System</h2>
        <p class="mb-4">At the heart of UK politics is the Westminster system, named after the Palace of Westminster where Parliament meets. The system consists of three components: the executive (led by the Prime Minister), the legislature (Parliament), and the judiciary. Parliament itself is bicameral, comprising the House of Commons and the House of Lords.</p>
        
        <p class="mb-4">The Prime Minister, typically the leader of the party with the most seats in the House of Commons, serves as head of government. The monarch, currently King Charles III, acts as head of state with largely ceremonial duties. General elections must be held at least every five years, though they can be called earlier under certain circumstances.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Major Political Parties</h2>
        <p class="mb-4">The UK political landscape is dominated by several major parties. The Conservative Party, traditionally center-right, advocates for free-market economics and smaller government. The Labour Party, positioned on the center-left, emphasizes social justice, workers' rights, and public services. The Liberal Democrats occupy the center ground, promoting liberal social policies and proportional representation.</p>
        
        <p class="mb-4">Other significant parties include the Scottish National Party (SNP), which campaigns for Scottish independence, Plaid Cymru advocating for Welsh interests and independence, and the Green Party focusing on environmental issues. The Democratic Unionist Party (DUP) represents unionist views in Northern Ireland. Smaller parties and independents also contribute to the political discourse.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Democratic Processes</h2>
        <p class="mb-4">UK citizens participate in democracy through various means. Voting in general elections is the primary way people express their political preferences, though turnout varies. Local elections for councils occur regularly, affecting decisions about schools, housing, and local services. Referendums, such as the 2016 EU membership vote, allow citizens to decide on specific issues directly.</p>
        
        <p class="mb-4">Beyond voting, citizens can engage with politics through petitions, contacting MPs, participating in protests, joining political parties, or working with advocacy organizations. The UK has a free press that scrutinizes political activities, and Parliament broadcasts proceedings live online, increasing transparency.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Recent Developments</h2>
        <p class="mb-4">Recent years have seen significant political developments, most notably Brexit—the UK's withdrawal from the European Union. This process dominated political discourse from 2016 to 2020, leading to multiple general elections and leadership changes. The ongoing integration of Brexit into UK law and policy continues to shape political debates.</p>
        
        <p class="mb-4">Devolution has also been a major theme, with Scotland, Wales, and Northern Ireland gaining increased legislative powers. This has led to varying policies across the UK on issues like healthcare, education, and taxation. The question of Scottish independence remains a contentious issue that could reshape the UK's political map.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">Politics and Daily Life</h2>
        <p class="mb-4">Politics directly affects citizens' daily lives through decisions about taxation, public spending, healthcare, education, and social services. Government policies determine everything from the quality of roads and public transport to the availability of affordable housing and university funding. International relations impact trade, travel, and security.</p>
        
        <p class="mb-4">Political engagement isn't limited to formal processes. Community activism, local campaigning, and civic participation all contribute to the democratic ecosystem. Understanding how the political system works empowers individuals to advocate for changes they want to see in their communities.</p>
        
        <div class="mt-8 p-4 bg-muted rounded-lg">
          <p class="italic">This content was generated with AI assistance. Refresh for a new perspective on UK politics!</p>
        </div>
      `);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load content. Please try again.');
      setContent(`
        <h1 class="text-3xl font-bold mb-6">UK Politics Overview</h1>
        <p>The UK political system includes:</p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Parliamentary democracy with constitutional monarchy</li>
          <li>House of Commons and House of Lords</li>
          <li>Prime Minister as head of government</li>
          <li>Major parties: Conservatives, Labour, Liberal Democrats</li>
          <li>Devolved governments in Scotland, Wales, and Northern Ireland</li>
          <li>Regular elections and democratic processes</li>
        </ul>
        <p class="mt-4">This system determines policies affecting all aspects of British life.</p>
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
          <h1 className="text-4xl font-bold text-glass-foreground">UK Politics</h1>
          <p className="text-muted-foreground">Understand the UK political system and its impact on daily life</p>
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

export default UKPoliticsPage;