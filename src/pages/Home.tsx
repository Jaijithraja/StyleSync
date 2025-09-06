import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, Plus, Camera, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';
import Sidebar from '@/components/Sidebar';
import DatabaseStatus from '@/components/DatabaseStatus';
import DebugPanel from '@/components/DebugPanel';

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCameraOptions, setShowCameraOptions] = useState(false);

  const categories = [
    { 
      name: 'Catalogue', 
      image: '/assets/catalogue.png', 
      path: '/catalogue',
      description: 'Browse your wardrobe'
    },
    { 
      name: 'Starred', 
      image: '/assets/Starred.png', 
      path: '/starred',
      description: 'Your favorite outfits'
    },
    { 
      name: 'Planner', 
      image: '/assets/Planner.png', 
      path: '/planner',
      description: 'Plan your outfits'
    },
    { 
      name: 'Randomise', 
      image: '/assets/Randomise.png', 
      path: '/randomise',
      description: 'Discover new looks'
    },
  ];

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleCameraOption = (option: 'camera' | 'gallery') => {
    console.log(`Opening ${option}`);
    setShowCameraOptions(false);
    // In a real app, this would open camera/gallery
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={12} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="h-10 w-10"
          >
            <Menu size={24} />
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notifications')}
              className="h-10 w-10"
            >
              <Bell size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="h-10 w-10"
            >
              <User size={24} />
            </Button>
          </div>
        </header>


        {/* Database Status */}
        <div className="px-6 mb-4">
          <DatabaseStatus />
        </div>

        {/* Debug Panel */}
        <div className="px-6 mb-4">
          <DebugPanel />
        </div>

        {/* AI Chat Section */}
        <div className="px-6 mb-8">
          <div className="bg-white/80 rounded-2xl p-2 shadow-sm relative">
            {/* GIF at top left corner of outer white box */}
            <div className="absolute z-10 pointer-events-none top-0 left-0 -translate-x-8 -translate-y-[5rem]">
              <img
                src="/assets/cute-unscreen.gif"
                alt="Mish Mish animated"
                className="w-40 h-40 object-contain pointer-events-none"
              />
            </div>
            
            {/* removed speech bubble as requested */}
            
            <button
              onClick={handleChatClick}
              className="w-full bg-white border-2 border-maroon rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-muted-foreground">Ask Mish Mish</span>
              <div className="w-8 h-8 bg-maroon rounded-full flex items-center justify-center">
                <span className="text-white text-sm">▶</span>
              </div>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 mb-8 -mt-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate(category.path)}
                className="rounded-2xl p-4 sm:p-6 text-center hover:bg-white/90 transition-colors shadow-sm bg-box-gradient"
              >
                <div className="mb-2 flex justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className={`object-contain ${
                      category.name === 'Planner' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-10 h-10 sm:w-12 sm:h-12'
                    }`}
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Plus Button */}
        <div className="fixed bottom-8 right-8">
          <div className="relative">
            <TwinklingStars count={5} className="w-20 h-20" />
            <Button
              onClick={() => setShowCameraOptions(!showCameraOptions)}
              className="w-14 h-14 bg-black hover:bg-black/90 rounded-full shadow-lg"
            >
              <Plus size={24} className="text-white" />
            </Button>
            
            {/* Camera Options */}
            {showCameraOptions && (
              <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-2 space-y-2 min-w-32">
                <button
                  onClick={() => handleCameraOption('camera')}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <Camera size={16} />
                  <span>Camera</span>
                </button>
                <button
                  onClick={() => handleCameraOption('gallery')}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <Image size={16} />
                  <span>Gallery</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;