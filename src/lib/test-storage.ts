import { supabase } from './supabase'

export const testStorageConnection = async () => {
  console.log('🔍 Testing Supabase Storage Connection...')
  
  try {
    // Test 1: List all buckets
    console.log('1. Listing all storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Failed to list buckets:', bucketsError)
      return { success: false, error: bucketsError.message }
    }
    
    console.log('✅ Buckets found:', buckets?.map(b => b.name))
    
    // Test 2: Check for required buckets
    const requiredBuckets = ['avatars', 'items']
    const existingBuckets = buckets?.map(bucket => bucket.name) || []
    const missingBuckets = requiredBuckets.filter(bucket => !existingBuckets.includes(bucket))
    
    console.log('Required buckets:', requiredBuckets)
    console.log('Existing buckets:', existingBuckets)
    console.log('Missing buckets:', missingBuckets)
    
    // Test 3: Try to access each bucket
    for (const bucket of buckets || []) {
      console.log(`3. Testing access to bucket "${bucket.name}"...`)
      
      try {
        const { data: files, error: filesError } = await supabase.storage
          .from(bucket.name)
          .list('', { limit: 1 })
        
        if (filesError) {
          console.error(`❌ Error accessing bucket "${bucket.name}":`, filesError)
        } else {
          console.log(`✅ Successfully accessed bucket "${bucket.name}"`)
        }
      } catch (error) {
        console.error(`❌ Exception accessing bucket "${bucket.name}":`, error)
      }
    }
    
    // Test 4: Try to upload a test file (if items bucket exists)
    if (existingBuckets.includes('items')) {
      console.log('4. Testing file upload to items bucket...')
      
      try {
        // Create a small test file
        const testContent = 'test file content'
        const testFile = new File([testContent], 'test.txt', { type: 'text/plain' })
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('items')
          .upload(`test-${Date.now()}.txt`, testFile)
        
        if (uploadError) {
          console.error('❌ Upload test failed:', uploadError)
        } else {
          console.log('✅ Upload test successful:', uploadData)
          
          // Clean up test file
          const { error: deleteError } = await supabase.storage
            .from('items')
            .remove([uploadData.path])
          
          if (deleteError) {
            console.warn('⚠️ Failed to clean up test file:', deleteError)
          } else {
            console.log('✅ Test file cleaned up')
          }
        }
      } catch (error) {
        console.error('❌ Upload test exception:', error)
      }
    }
    
    return {
      success: true,
      buckets: buckets,
      existingBuckets,
      missingBuckets,
      hasRequiredBuckets: missingBuckets.length === 0
    }
    
  } catch (error) {
    console.error('❌ Storage test failed:', error)
    return { success: false, error: error.message }
  }
}
