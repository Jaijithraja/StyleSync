// Mock data for when database is not available
export const mockCategories = [
  { id: 'shirts', name: 'Shirts', description: 'Tops and shirts', color: '#3B82F6', icon: '👕', created_at: new Date().toISOString() },
  { id: 'trousers', name: 'Trousers', description: 'Pants and jeans', color: '#10B981', icon: '👖', created_at: new Date().toISOString() },
  { id: 'accessories', name: 'Accessories', description: 'Jewelry and accessories', color: '#8B5CF6', icon: '🎒', created_at: new Date().toISOString() },
  { id: 'shoes', name: 'Shoes', description: 'Footwear', color: '#F59E0B', icon: '👟', created_at: new Date().toISOString() },
]

export const mockItems = [
  {
    id: '1',
    user_id: 'demo-user',
    category_id: 'shirts',
    name: 'Blue T-Shirt',
    description: 'Comfortable cotton t-shirt',
    image_url: '/assets/shirts.png',
    color: 'Blue',
    brand: 'Demo Brand',
    size: 'M',
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[0]
  },
  {
    id: '2',
    user_id: 'demo-user',
    category_id: 'trousers',
    name: 'Black Jeans',
    description: 'Classic black denim',
    image_url: '/assets/trousers.png',
    color: 'Black',
    brand: 'Demo Brand',
    size: '32',
    is_favorite: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[1]
  },
  {
    id: '3',
    user_id: 'demo-user',
    category_id: 'shirts',
    name: 'White Button-Up',
    description: 'Crisp white dress shirt',
    image_url: '/assets/shirts.png',
    color: 'White',
    brand: 'Fashion Co',
    size: 'L',
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[0]
  },
  {
    id: '4',
    user_id: 'demo-user',
    category_id: 'shoes',
    name: 'White Sneakers',
    description: 'Clean white athletic shoes',
    image_url: '/assets/shoes.png',
    color: 'White',
    brand: 'Sneaker Brand',
    size: '10',
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[3]
  },
  {
    id: '5',
    user_id: 'demo-user',
    category_id: 'accessories',
    name: 'Leather Watch',
    description: 'Classic leather strap watch',
    image_url: '/assets/accessories.png',
    color: 'Brown',
    brand: 'Time Co',
    size: 'One Size',
    is_favorite: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[2]
  }
]

export const mockOutfits = [
  {
    id: '1',
    user_id: 'demo-user',
    name: 'Casual Look',
    description: 'Perfect for everyday wear',
    items: ['1', '2'],
    image_url: null,
    is_starred: true,
    weather_condition: 'sunny',
    occasion: 'casual',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const mockEvents = [
  {
    id: '1',
    user_id: 'demo-user',
    title: 'Coffee Meeting',
    description: 'Meeting with client',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    time: '10:00',
    location: 'Downtown Cafe',
    weather_condition: 'sunny',
    outfit_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]
