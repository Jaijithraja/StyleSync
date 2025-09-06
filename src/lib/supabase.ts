import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  color?: string
  icon?: string
  created_at: string
}

export interface Item {
  id: string
  user_id: string
  category_id: string
  name: string
  description?: string
  image_url?: string
  color?: string
  brand?: string
  size?: string
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export interface Outfit {
  id: string
  user_id: string
  name: string
  description?: string
  items: string[] // Array of item IDs
  image_url?: string
  is_starred: boolean
  weather_condition?: string
  occasion?: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  user_id: string
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  weather_condition?: string
  outfit_id?: string
  created_at: string
  updated_at: string
}

export interface Board {
  id: string
  user_id: string
  name: string
  description?: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface BoardItem {
  id: string
  board_id: string
  item_id: string
  position_x: number
  position_y: number
  created_at: string
}
