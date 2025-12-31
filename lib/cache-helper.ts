// lib/cache-helper.ts
import redis from './redis'

export async function getCachedData<T>(
  key: string,
  fallback: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  if (!redis) {
    console.log('⚠️ Redis not available, fetching fresh data')
    return fallback()
  }

  try {
    const cached = await redis.get(key)
    
    if (cached) {
      console.log(`✅ Cache HIT: ${key}`)
      try {
        return JSON.parse(cached)
      } catch (parseError) {
        console.error(`❌ Failed to parse cached data for ${key}, fetching fresh`)
        // If cached data is corrupted, delete it and fetch fresh
        await redis.del(key)
      }
    }
    
    console.log(`❌ Cache MISS: ${key}`)
    
    const data = await fallback()
    
    // Cache in background (don't block)
    redis.setex(key, ttl, JSON.stringify(data)).catch(err => {
      console.error(`Failed to cache ${key}:`, err.message)
    })
    
    return data
  } catch (error: any) {
    console.error(`Cache error for ${key}:`, error.message)
    // If Redis fails, fallback to fetching
    return fallback()
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  if (!redis) return

  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`🗑️ Invalidated ${keys.length} keys: ${pattern}`)
    }
  } catch (error: any) {
    console.error('Failed to invalidate cache:', error.message)
  }
}

export async function refreshCache(userId: string): Promise<void> {
  await invalidateCache(`twitter:*:${userId}`)
}