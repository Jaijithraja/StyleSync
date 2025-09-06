import React from 'react';
import { Heart, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/lib/supabase';

interface ItemCardProps {
  item: Item & { category?: { name: string; color?: string } };
  onEdit?: (item: Item) => void;
  onDelete?: (itemId: string) => void;
  onToggleFavorite?: (itemId: string, isFavorite: boolean) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  onEdit, 
  onDelete, 
  onToggleFavorite 
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
        <div className="relative">
          {/* Item Image */}
          <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm">No image</p>
                </div>
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
            onClick={() => onToggleFavorite?.(item.id, !item.is_favorite)}
          >
            <Heart 
              size={16} 
              className={item.is_favorite ? "fill-red-500 text-red-500" : "text-gray-600"} 
            />
          </Button>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 left-2 h-8 w-8 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => onEdit?.(item)}>
                <Edit size={16} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(item.id)}
                className="text-red-600"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Item Details */}
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm truncate flex-1">{item.name}</h3>
            {item.category && (
              <Badge 
                variant="secondary" 
                className="ml-2 text-xs"
                style={{ backgroundColor: item.category.color + '20', color: item.category.color }}
              >
                {item.category.name}
              </Badge>
            )}
          </div>
          
          {item.brand && (
            <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
          )}
          
          {item.color && (
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.color}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
