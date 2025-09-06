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
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VDwvdGV4dD4KPC9zdmc+',
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
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SjwvdGV4dD4KPC9zdmc+',
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
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNEREQiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD4KPC9zdmc+',
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
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNEREQiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD4KPC9zdmc+',
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
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VzwvdGV4dD4KPC9zdmc+',
    color: 'Brown',
    brand: 'Time Co',
    size: 'One Size',
    is_favorite: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[2]
  },
  {
    id: '6',
    user_id: 'demo-user',
    category_id: 'shirts',
    name: 'Red Hoodie',
    description: 'Comfortable red hoodie',
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRUY0NDQ0Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SDwvdGV4dD4KPC9zdmc+',
    color: 'Red',
    brand: 'Sport Co',
    size: 'L',
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[0]
  },
  {
    id: '7',
    user_id: 'demo-user',
    category_id: 'trousers',
    name: 'Blue Jeans',
    description: 'Classic blue denim',
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMTA5Qjk4MSIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkI8L3RleHQ+Cjwvc3ZnPg==',
    color: 'Blue',
    brand: 'Denim Co',
    size: '34',
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[1]
  },
  {
    id: '8',
    user_id: 'demo-user',
    category_id: 'shoes',
    name: 'Black Boots',
    description: 'Stylish black boots',
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QjwvdGV4dD4KPC9zdmc+',
    color: 'Black',
    brand: 'Boot Co',
    size: '9',
    is_favorite: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[3]
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
