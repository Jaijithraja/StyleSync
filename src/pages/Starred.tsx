import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Plus, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { outfitsApi, itemsApi } from '@/lib/api';
import { Outfit, Item, Category } from '@/lib/supabase';
import TwinklingStars from '@/components/TwinklingStars';

const Starred = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [starredOutfits, setStarredOutfits] = useState<(Outfit & { items?: (Item & { category?: Category })[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStarredOutfits();
    }
  }, [user]);

  const loadStarredOutfits = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const outfits = await outfitsApi.getStarred(user.id);
      
      // Load items for each outfit
      const outfitsWithItems = await Promise.all(
        outfits.map(async (outfit) => {
          if (outfit.items && outfit.items.length > 0) {
            const items = await Promise.all(
              outfit.items.map(async (itemId) => {
                try {
                  const allItems = await itemsApi.getAll(user.id);
                  return allItems.find(i => i.id === itemId);
                } catch (error) {
                  console.error('Failed to load item:', error);
                  return null;
                }
              })
            );
            return { ...outfit, items: items.filter(Boolean) as (Item & { category?: Category })[] };
          }
          return { ...outfit, items: [] };
        })
      );
      
      setStarredOutfits(outfitsWithItems);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load starred outfits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnstarOutfit = async (outfitId: string) => {
    try {
      await outfitsApi.update(outfitId, { is_starred: false });
      setStarredOutfits(prev => prev.filter(outfit => outfit.id !== outfitId));
      toast({
        title: "Success",
        description: "Outfit removed from starred",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unstar outfit",
        variant: "destructive",
      });
    }
  };

  const handleDeleteOutfit = async (outfitId: string) => {
    try {
      await outfitsApi.delete(outfitId);
      setStarredOutfits(prev => prev.filter(outfit => outfit.id !== outfitId));
      toast({
        title: "Success",
        description: "Outfit deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete outfit",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={8} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Starred Outfits</h1>
        </header>

        {/* Starred Outfits Grid */}
        <div className="px-6">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading starred outfits...</p>
            </div>
          ) : starredOutfits.length === 0 ? (
            <div className="text-center py-16">
              <Star className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-lg font-semibold text-foreground mb-2">No starred outfits yet</h3>
              <p className="text-muted-foreground mb-6">Star outfits from Randomise to see them here</p>
              <Button
                onClick={() => navigate('/randomise')}
                className="bg-primary hover:bg-primary/90"
              >
                Discover Outfits
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {starredOutfits.map((outfit) => (
                <div key={outfit.id} className="bg-white/80 rounded-lg p-4 hover:bg-white/90 transition-colors relative group">
                  <div className="aspect-square bg-gray-50 rounded-md flex flex-col items-center justify-center mb-3">
                    <div className="text-6xl mb-2">👗</div>
                    <p className="text-sm text-muted-foreground text-center">
                      {outfit.items?.length || 0} items
                    </p>
                  </div>

                  <div className="text-center mb-3">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{outfit.name}</h3>
                    {outfit.occasion && (
                      <p className="text-xs text-muted-foreground capitalize">{outfit.occasion}</p>
                    )}
                  </div>

                  {/* Item list */}
                  {outfit.items && outfit.items.length > 0 && (
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {outfit.items.slice(0, 3).map((item, index) => (
                        <p key={index}>• {item.name}</p>
                      ))}
                      {outfit.items.length > 3 && (
                        <p>• +{outfit.items.length - 3} more</p>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={() => handleUnstarOutfit(outfit.id)}
                        title="Unstar outfit"
                      >
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-white/90 hover:bg-white text-red-600"
                        onClick={() => handleDeleteOutfit(outfit.id)}
                        title="Delete outfit"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Starred;