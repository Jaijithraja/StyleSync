import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { testStorageConnection } from '@/lib/test-storage'
import { localStorage } from '@/lib/local-storage'
import { itemsApi } from '@/lib/api'

const DebugPanel = () => {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runStorageTest = async () => {
    setLoading(true)
    try {
      const results = await testStorageConnection()
      setTestResults(results)
      console.log('Storage test results:', results)
    } catch (error) {
      console.error('Storage test failed:', error)
      setTestResults({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testLocalStorage = () => {
    const items = localStorage.getItems()
    console.log('Local storage items:', items)
    alert(`Local storage has ${items.length} items`)
  }

  const testAddItem = async () => {
    try {
      const testItem = {
        name: 'Test Item',
        description: 'Test description',
        category_id: 'shirts',
        brand: 'Test Brand',
        color: 'Blue',
        size: 'M',
        image_url: 'data:image/png;base64,test',
        is_favorite: false
      }
      
      const result = await itemsApi.create('test-user', testItem)
      console.log('Test item created:', result)
      alert('Test item created successfully!')
    } catch (error) {
      console.error('Test item creation failed:', error)
      alert('Test item creation failed: ' + error.message)
    }
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button onClick={runStorageTest} disabled={loading}>
            {loading ? 'Testing...' : 'Test Storage'}
          </Button>
          <Button onClick={testLocalStorage} variant="outline">
            Test Local Storage
          </Button>
          <Button onClick={testAddItem} variant="outline">
            Test Add Item
          </Button>
        </div>
        
        {testResults && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <h4 className="font-semibold mb-2">Storage Test Results:</h4>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DebugPanel
