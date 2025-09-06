import { supabase } from './supabase'

export const debugDatabase = async () => {
  console.log('🔍 Debugging database connection...')
  
  try {
    // Test 1: Check if we can connect to Supabase
    console.log('1. Testing basic Supabase connection...')
    const { data: authData, error: authError } = await supabase.auth.getSession()
    console.log('Auth session:', authData, authError)
    
    // Test 2: Check if categories table exists
    console.log('2. Testing categories table...')
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5)
    console.log('Categories:', categoriesData, categoriesError)
    
    // Test 3: Check if items table exists
    console.log('3. Testing items table...')
    const { data: itemsData, error: itemsError } = await supabase
      .from('items')
      .select('*')
      .limit(5)
    console.log('Items:', itemsData, itemsError)
    
    // Test 4: Check if users table exists
    console.log('4. Testing users table...')
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5)
    console.log('Users:', usersData, usersError)
    
    // Test 5: Check storage buckets
    console.log('5. Testing storage buckets...')
    const { data: bucketsData, error: bucketsError } = await supabase.storage.listBuckets()
    console.log('Storage buckets:', bucketsData, bucketsError)
    
    return {
      success: true,
      auth: { data: authData, error: authError },
      categories: { data: categoriesData, error: categoriesError },
      items: { data: itemsData, error: itemsError },
      users: { data: usersData, error: usersError },
      storage: { data: bucketsData, error: bucketsError }
    }
  } catch (error) {
    console.error('❌ Database debug failed:', error)
    return { success: false, error: error.message }
  }
}
