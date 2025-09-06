import React, { useState, useEffect } from 'react'
import { debugDatabase } from '@/lib/debug-database'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertTriangle, Database } from 'lucide-react'

const DatabaseStatus = () => {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const checkDatabaseStatus = async () => {
    setLoading(true)
    const result = await debugDatabase()
    setStatus(result)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 animate-spin" />
          <span>Checking database status...</span>
        </div>
      </div>
    )
  }

  if (!status) {
    return (
      <Alert className="m-4">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Database Check Failed</AlertTitle>
        <AlertDescription>
          Unable to check database status. Please check your connection.
        </AlertDescription>
      </Alert>
    )
  }

  const hasErrors = status.categories?.error || status.items?.error || status.users?.error

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Database Status</h3>
        <Button onClick={checkDatabaseStatus} size="sm" variant="outline">
          Refresh
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          {status.auth?.error ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          <span>Authentication: {status.auth?.error ? 'Error' : 'Connected'}</span>
        </div>

        <div className="flex items-center space-x-2">
          {status.categories?.error ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          <span>Categories Table: {status.categories?.error ? 'Missing' : 'OK'}</span>
        </div>

        <div className="flex items-center space-x-2">
          {status.items?.error ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          <span>Items Table: {status.items?.error ? 'Missing' : 'OK'}</span>
        </div>

        <div className="flex items-center space-x-2">
          {status.users?.error ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          <span>Users Table: {status.users?.error ? 'Missing' : 'OK'}</span>
        </div>

        <div className="flex items-center space-x-2">
          {status.storage?.error ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          <span>Storage: {status.storage?.error ? 'Error' : 'OK'}</span>
        </div>

        {status.missingBuckets && status.missingBuckets.length > 0 && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Missing Storage Buckets:</strong> {status.missingBuckets.join(', ')}
            </p>
          </div>
        )}
      </div>

      {hasErrors && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Database Setup Required</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>It looks like the database tables haven't been created yet.</p>
            <p>Please follow these steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Go to your Supabase dashboard</li>
              <li>Navigate to the SQL Editor</li>
              <li>Copy the entire content from <code>supabase-schema.sql</code></li>
              <li>Paste it into the SQL Editor and click "Run"</li>
              <li>Go to <strong>Storage</strong> in your Supabase dashboard</li>
              <li>Create two new buckets: <code>avatars</code> and <code>items</code></li>
              <li>Set both buckets to <strong>"Public"</strong></li>
              <li>Refresh this page to check the status</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default DatabaseStatus
