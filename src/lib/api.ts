import { supabase, type User, type Category, type Item, type Outfit, type Event, type Board, type BoardItem } from './supabase'
import { mockCategories, mockItems, mockOutfits, mockEvents } from './mock-data'
import { localStorage } from './local-storage'

// User API
export const userApi = {
  async getProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return data.publicUrl
  }
}

// Categories API
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (error) {
        console.error('Categories API error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      console.log('Using mock categories as fallback')
      return mockCategories
    }
  }
}

// Items API
export const itemsApi = {
  async getAll(userId: string): Promise<Item[]> {
    // Always return mock items for immediate demo functionality
    console.log('Returning mock items for demo')
    return mockItems.map(item => ({
      ...item,
      user_id: userId, // Update user_id to match current user
      category: mockCategories.find(cat => cat.id === item.category_id)
    }))
  },

  async getByCategory(userId: string, categoryId: string): Promise<Item[]> {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getFavorites(userId: string): Promise<Item[]> {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('user_id', userId)
      .eq('is_favorite', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(userId: string, item: Omit<Item, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Item> {
    try {
      const { data, error } = await supabase
        .from('items')
        .insert({ ...item, user_id: userId })
        .select(`
          *,
          category:categories(*)
        `)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Failed to create item in database, using local storage:', error)
      const newItem: Item = {
        ...item,
        id: `local-${Date.now()}`,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      localStorage.addItem(newItem)
      return newItem
    }
  },

  async update(id: string, updates: Partial<Item>): Promise<Item> {
    const { data, error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        category:categories(*)
      `)
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async uploadImage(itemId: string, file: File): Promise<string> {
    try {
      console.log('Starting image upload process...')
      
      // First, check if storage buckets exist
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
      
      console.log('Storage buckets check:', { buckets, error: bucketsError })
      
      if (bucketsError) {
        console.error('Failed to check storage buckets:', bucketsError)
        throw new Error(`Storage check failed: ${bucketsError.message}`)
      }

      const hasItemsBucket = buckets?.some(bucket => bucket.name === 'items')
      console.log('Has items bucket:', hasItemsBucket)
      console.log('Available buckets:', buckets?.map(b => b.name))
      
      if (!hasItemsBucket) {
        console.log('Items bucket not found, using base64 fallback')
        // Convert file to base64 for local storage
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            console.log('Image converted to base64 successfully')
            resolve(reader.result as string)
          }
          reader.onerror = () => reject(new Error('Failed to read file'))
          reader.readAsDataURL(file)
        })
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${itemId}-${Date.now()}.${fileExt}`
      const filePath = `items/${fileName}`

      console.log('Uploading image to Supabase storage...', { fileName, filePath })
      
      const { error: uploadError } = await supabase.storage
        .from('items')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        throw new Error(`Storage upload failed: ${uploadError.message}`)
      }

      const { data } = supabase.storage
        .from('items')
        .getPublicUrl(filePath)

      console.log('Image uploaded successfully to Supabase:', data.publicUrl)
      return data.publicUrl
    } catch (error) {
      console.error('Image upload failed, using base64 fallback:', error)
      // Fallback to base64 encoding
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          console.log('Using base64 fallback for image')
          resolve(reader.result as string)
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })
    }
  }
}

// Outfits API
export const outfitsApi = {
  async getAll(userId: string): Promise<Outfit[]> {
    try {
      const { data, error } = await supabase
        .from('outfits')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Outfits API error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Failed to fetch outfits:', error)
      console.log('Using mock outfits as fallback')
      return mockOutfits
    }
  },

  async getStarred(userId: string): Promise<Outfit[]> {
    const { data, error } = await supabase
      .from('outfits')
      .select('*')
      .eq('user_id', userId)
      .eq('is_starred', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(userId: string, outfit: Omit<Outfit, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Outfit> {
    const { data, error } = await supabase
      .from('outfits')
      .insert({ ...outfit, user_id: userId })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Outfit>): Promise<Outfit> {
    const { data, error } = await supabase
      .from('outfits')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('outfits')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async generateRandom(userId: string, categoryIds?: string[]): Promise<Outfit> {
    // Get random items from user's wardrobe
    let query = supabase
      .from('items')
      .select('*')
      .eq('user_id', userId)
    
    if (categoryIds && categoryIds.length > 0) {
      query = query.in('category_id', categoryIds)
    }
    
    const { data: items, error } = await query
    
    if (error) throw error
    
    if (!items || items.length === 0) {
      throw new Error('No items found to create outfit')
    }
    
    // Group items by category
    const itemsByCategory = items.reduce((acc, item) => {
      const categoryId = item.category_id || 'uncategorized'
      if (!acc[categoryId]) acc[categoryId] = []
      acc[categoryId].push(item)
      return acc
    }, {} as Record<string, Item[]>)
    
    // Select one random item from each category
    const selectedItems = Object.values(itemsByCategory).map(categoryItems => {
      const items = Array.isArray(categoryItems) ? categoryItems : []
      const randomIndex = Math.floor(Math.random() * items.length)
      return items[randomIndex]
    })
    
    // Create outfit
    const outfit = await this.create(userId, {
      name: `Random Outfit ${new Date().toLocaleDateString()}`,
      description: 'AI-generated random outfit',
      items: selectedItems.map(item => item.id),
      is_starred: false,
    })
    
    return outfit
  }
}

// Events API
export const eventsApi = {
  async getAll(userId: string): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          outfit:outfits(*)
        `)
        .eq('user_id', userId)
        .order('date', { ascending: true })
      
      if (error) {
        console.error('Events API error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Failed to fetch events:', error)
      console.log('Using mock events as fallback')
      return mockEvents
    }
  },

  async getUpcoming(userId: string, limit: number = 10): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        outfit:outfits(*)
      `)
      .eq('user_id', userId)
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async create(userId: string, event: Omit<Event, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert({ ...event, user_id: userId })
      .select(`
        *,
        outfit:outfits(*)
      `)
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        outfit:outfits(*)
      `)
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Boards API
export const boardsApi = {
  async getAll(userId: string): Promise<Board[]> {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getPublic(): Promise<Board[]> {
    const { data, error } = await supabase
      .from('boards')
      .select(`
        *,
        user:users(full_name, avatar_url)
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string): Promise<Board & { items: (BoardItem & { item: Item })[] }> {
    const { data, error } = await supabase
      .from('boards')
      .select(`
        *,
        board_items (
          *,
          item:items (
            *,
            category:categories(*)
          )
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(userId: string, board: Omit<Board, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Board> {
    const { data, error } = await supabase
      .from('boards')
      .insert({ ...board, user_id: userId })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Board>): Promise<Board> {
    const { data, error } = await supabase
      .from('boards')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('boards')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async addItem(boardId: string, itemId: string, position: { x: number; y: number }): Promise<BoardItem> {
    const { data, error } = await supabase
      .from('board_items')
      .insert({
        board_id: boardId,
        item_id: itemId,
        position_x: position.x,
        position_y: position.y,
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateItemPosition(id: string, position: { x: number; y: number }): Promise<BoardItem> {
    const { data, error } = await supabase
      .from('board_items')
      .update({
        position_x: position.x,
        position_y: position.y,
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async removeItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('board_items')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
