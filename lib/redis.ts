// lib/redis.ts
import Redis from 'ioredis'

let redis: Redis | null = null

function getRedis() {
  if (redis) {
    return redis
  }

  if (!process.env.REDIS_URL) {
    console.warn('⚠️ REDIS_URL not set, caching disabled')
    return null
  }

  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    retryStrategy(times) {
      if (times > 3) {
        console.error('❌ Redis retry limit reached')
        return null // Stop retrying
      }
      const delay = Math.min(times * 50, 2000)
      console.log(`🔄 Redis retry attempt ${times}, waiting ${delay}ms`)
      return delay
    },
    // Upstash-specific settings
    tls: {
      rejectUnauthorized: false
    },
    family: 4, // Force IPv4
  })

  redis.on('error', (err) => {
    console.error('❌ Redis error:', err.message)
  })

  redis.on('connect', () => {
    console.log('✅ Connected to Upstash Redis')
  })

  redis.on('ready', () => {
    console.log('✅ Upstash Redis ready')
  })

  return redis
}

export default getRedis()