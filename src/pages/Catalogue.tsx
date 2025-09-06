import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { categoriesApi, itemsApi } from '@/lib/api';
import { Category, Item } from '@/lib/supabase';
import TwinklingStars from '@/components/TwinklingStars';
import ItemCard from '@/components/ItemCard';
import AddItemDialog from '@/components/AddItemDialog';

const Catalogue = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<(Item & { category?: Category })[]>([]);
  const [filteredItems, setFilteredItems] = useState<(Item & { category?: Category })[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  // Default categories with proper styling
  const defaultCategories = [
    { id: 'shirts', name: 'Shirts', image: '/assets/shirts.png', color: 'bg-blue-100', icon: '👕' },
    { id: 'trousers', name: 'Trousers', image: '/assets/trousers.png', color: 'bg-green-100', icon: '👖' },
    { id: 'accessories', name: 'Accessories', image: '/assets/accessories.png', color: 'bg-purple-100', icon: '🎒' },
    { id: 'shoes', name: 'Shoes', image: '/assets/shoes.png', color: 'bg-orange-100', icon: '👟' },
  ];

  const suggestedEvents = [
    'Winter Outfits',
    'Beach Outfits', 
    'Date Outfits',
    'Work Outfits',
    'Party Outfits',
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, selectedCategory, searchQuery]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      console.log('Loading catalogue data...');
      
      const [categoriesData, itemsData] = await Promise.all([
        categoriesApi.getAll(),
        itemsApi.getAll(user.id),
      ]);
      
      console.log('Loaded categories:', categoriesData);
      console.log('Loaded items:', itemsData);
      
      // Use default categories for display
      setCategories(defaultCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: '',
        color: cat.color,
        icon: cat.icon,
        created_at: new Date().toISOString()
      })));
      
      // Ensure items have proper structure
      const processedItems = itemsData.map(item => ({
        ...item,
        category: defaultCategories.find(cat => cat.id === item.category_id)
      }));
      
      setItems(processedItems);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set default categories even on error
      setCategories(defaultCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: '',
        color: cat.color,
        icon: cat.icon,
        created_at: new Date().toISOString()
      })));
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category_id === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleItemAdded = (newItem: Item) => {
    setItems(prev => [newItem, ...prev]);
  };

  const handleToggleFavorite = async (itemId: string, isFavorite: boolean) => {
    try {
      await itemsApi.update(itemId, { is_favorite: isFavorite });
      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, is_favorite: isFavorite } : item
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await itemsApi.delete(itemId);
      setItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={10} />
      
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
          <h1 className="text-2xl font-bold text-foreground">Catalogue</h1>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus size={20} className="mr-2" />
            Add Item
          </Button>
        </header>

        {/* Search Bar */}
        <div className="px-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 border-border"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {defaultCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`p-7 rounded-2xl text-center hover:scale-105 transition-all duration-200 shadow-sm ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white/80 hover:bg-white/90'
                }`}
              >
                <div className="mb-3 flex justify-center">
                  <div className="w-[88px] h-[88px] flex items-center justify-center">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Events */}
        <div className="px-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Suggested Events</h2>
          <div className="space-y-3">
            {suggestedEvents.map((event, index) => (
              <button
                key={event}
                className="w-full p-4 bg-gradient-to-r from-white/60 to-white/40 rounded-xl text-left hover:from-white/70 hover:to-white/50 transition-all duration-200 shadow-sm"
              >
                <h3 className="font-medium text-foreground">{event}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="px-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading items...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {selectedCategory 
                  ? categories.find(c => c.id === selectedCategory)?.name + ' Items'
                  : 'All Items'
                } ({filteredItems.length})
              </h2>
            <div className="grid grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onToggleFavorite={handleToggleFavorite}
                    onDelete={handleDeleteItem}
                  />
                ))}
                  </div>
                </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? "Try adjusting your search terms"
                  : selectedCategory 
                    ? "No items in this category yet"
                    : "Start building your wardrobe by adding some items"
                }
              </p>
              {!searchQuery && !selectedCategory && (
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus size={20} className="mr-2" />
                  Add Your First Item
                </Button>
              )}
            </div>
          )}
          </div>

        {/* Add Item Dialog */}
        {user && (
          <AddItemDialog
            open={showAddDialog}
            onOpenChange={setShowAddDialog}
            categories={defaultCategories.map(cat => ({
              id: cat.id,
              name: cat.name,
              description: '',
              color: cat.color,
              icon: cat.icon,
              created_at: new Date().toISOString()
            }))}
            onItemAdded={handleItemAdded}
            userId={user.id}
          />
        )}
      </div>
    </div>
  );
};

export default Catalogue;