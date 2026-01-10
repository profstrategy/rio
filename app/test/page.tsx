// app/test/page.tsx
'use client'

import { useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testEndpoint = async (method: string, endpoint: string) => {
    setLoading(true)
    try {
      const res = await fetch(endpoint, {
        method,
        credentials: 'include',
      })
      const data = await res.json()
      setResult({ status: res.status, endpoint, data })
    } catch (error: any) {
      setResult({ error: error.message, endpoint })
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Test Console</h1>
      
      <div className="grid grid-cols-1 gap-3 mb-6">
        <button
          onClick={() => testEndpoint('GET', '/api/auth/session')}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          Check Session
        </button>

        <button
          onClick={() => testEndpoint('GET', '/api/debug/rate-limit-check')}
          className="p-3 bg-purple-500 text-white rounded hover:bg-purple-600"
          disabled={loading}
        >
          Check Rate Limit Status
        </button>

        <button
          onClick={() => testEndpoint('POST', '/api/cache/clear')}
          className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={loading}
        >
          Clear Cache (POST)
        </button>

        <button
          onClick={() => testEndpoint('GET', '/api/user/dashboard-activity?mock=true')}
          className="p-3 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={loading}
        >
          Get Dashboard (Mock Data)
        </button>

        <button
          onClick={() => testEndpoint('GET', '/api/debug/twitter-raw')}
          className="p-3 bg-orange-500 text-white rounded hover:bg-orange-600"
          disabled={loading}
        >
          Get Raw Twitter Data
        </button>

        <button
          onClick={() => testEndpoint('GET', '/api/user/dashboard-activity')}
          className="p-3 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          disabled={loading}
        >
          Get Dashboard (Real Data)
        </button>
      </div>

      {loading && (
        <div className="p-4 bg-yellow-100 rounded">
          Loading...
        </div>
      )}

      {result && (
        <div className="bg-white border rounded p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">{result.endpoint}</h2>
            <span className={`px-3 py-1 rounded text-sm ${
              result.status === 200 ? 'bg-green-100 text-green-800' : 
              result.status === 401 ? 'bg-red-100 text-red-800' :
              result.status === 429 ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {result.status || 'Error'}
            </span>
          </div>
          <pre className="text-xs overflow-auto bg-gray-50 p-3 rounded max-h-96">
            {JSON.stringify(result.data || result.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}