import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, X, RefreshCw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { outfitsApi, itemsApi, categoriesApi } from '@/lib/api';
import { Outfit, Item, Category } from '@/lib/supabase';
import TwinklingStars from '@/components/TwinklingStars';

const Randomise = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null);
  const [outfitItems, setOutfitItems] = useState<(Item & { category?: Category })[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (user) {
      loadCategories();
      generateRandomOutfit();
    }
  }, [user]);

  const loadCategories = async () => {
    try {
      const categoriesData = await categoriesApi.getAll();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const generateRandomOutfit = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const outfit = await outfitsApi.generateRandom(user.id);
      setCurrentOutfit(outfit);
      
      // Load outfit items
      if (outfit.items && outfit.items.length > 0) {
        const items = await Promise.all(
          outfit.items.map(async (itemId) => {
            try {
              const item = await itemsApi.getAll(user.id);
              return item.find(i => i.id === itemId);
            } catch (error) {
              console.error('Failed to load item:', error);
              return null;
            }
          })
        );
        setOutfitItems(items.filter(Boolean) as (Item & { category?: Category })[]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate outfit. Make sure you have items in your wardrobe.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentOutfit) return;

    setSwipeDirection(direction);
    
    setTimeout(async () => {
      if (direction === 'right') {
        // Add to starred
        try {
          await outfitsApi.update(currentOutfit.id, { is_starred: true });
          toast({
            title: "Success",
            description: "Outfit added to starred!",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to star outfit",
            variant: "destructive",
          });
        }
      }
      
      // Generate next outfit
      await generateRandomOutfit();
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={8} />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
              className="mr-4"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Randomise</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={generateRandomOutfit}
            disabled={loading}
            className="mr-2"
          >
            <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </Button>
        </header>

        {/* Card Stack */}
        <div className="flex flex-col items-center px-6">
          <div className="relative w-full max-w-md">
            {loading ? (
              <div className="bg-white rounded-3xl p-10 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">Generating outfit...</p>
              </div>
            ) : currentOutfit ? (
              <div className={`bg-white rounded-3xl p-10 shadow-xl transition-all duration-300 ${
                swipeDirection === 'left' ? 'transform -translate-x-full rotate-12 opacity-0' :
                swipeDirection === 'right' ? 'transform translate-x-full rotate-12 opacity-0' :
                'transform translate-x-0 rotate-0 opacity-100'
              }`}>
                <div className="aspect-square md:aspect-[1/1] bg-gray-100 rounded-2xl flex flex-col items-center justify-center mb-6 md:mb-8 w-full max-w-[520px]">
                  <div className="text-7xl md:text-8xl mb-4">👗</div>
                  <p className="text-xl md:text-2xl font-semibold text-foreground">{currentOutfit.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentOutfit.occasion ? `${currentOutfit.occasion} Look` : 'Random Outfit'}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  {outfitItems.length > 0 ? (
                    outfitItems.map((item, index) => (
                      <p key={index}>• {item.name} {item.brand && `(${item.brand})`}</p>
                    ))
                  ) : (
                    <p>• No items available</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4 text-center">
                  Add some items to your wardrobe to generate random outfits
                </p>
                <Button onClick={() => navigate('/catalogue')}>
                  <Shuffle size={20} className="mr-2" />
                  Go to Catalogue
                </Button>
              </div>
            )}

            {/* Background Cards */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-lg -z-10 transform scale-96 translate-y-2"></div>
            <div className="absolute inset-0 bg-white rounded-3xl shadow-sm -z-20 transform scale-92 translate-y-4"></div>
          </div>

          {/* Action Buttons moved to screen edges */}
          {currentOutfit && (
            <div className="relative w-full max-w-md mt-8">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <Button
                  onClick={() => handleSwipe('left')}
                  disabled={loading}
                  className="w-16 h-16 rounded-full text-gray-600 shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(217,217,217,0.5)' }}
                >
                  <X size={24} />
                </Button>
              </div>

              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                <Button
                  onClick={() => handleSwipe('right')}
                  disabled={loading}
                  className="w-16 h-16 rounded-full text-white shadow-lg p-0 overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(217,217,217,0.5)' }}
                >
                  <Star size={24} className="text-yellow-500" />
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 text-center text-muted-foreground">
            <p className="text-sm">Swipe left to pass, right to star</p>
            <p className="text-xs mt-1">Or use the buttons on either side</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Randomise;