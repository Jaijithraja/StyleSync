import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TwinklingStars from '@/components/TwinklingStars';
import { testSupabaseConnection } from '@/lib/test-connection';

const Splash = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Test Supabase connection
    testSupabaseConnection();

    const navigationTimer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative flex flex-col items-center justify-center">
      <TwinklingStars count={20} />
      
      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center space-y-4">
          <div className="relative">
            <h1 className="text-6xl font-bold text-foreground tracking-wider">
              STYLESYNC
              <span className="absolute -top-2 -right-2 text-2xl">✦</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground font-medium">
            One app, infinite style
          </p>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce mx-1" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;