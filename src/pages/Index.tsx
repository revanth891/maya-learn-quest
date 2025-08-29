import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has selected a language
    const savedLanguage = localStorage.getItem('MayaCode-Quest-language');
    if (!savedLanguage) {
      navigate('/language-select');
    }
  }, [navigate]);

  return <Home />;
};

export default Index;
