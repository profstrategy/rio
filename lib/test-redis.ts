// lib/test-redis.ts
import redis from './redis'

export async function testRedis() {
  if (!redis) {
    console.log('❌ Redis not configured')
    return false
  }

  try {
    await redis.set('test-key', 'test-value', 'EX', 10)
    const value = await redis.get('test-key')
    console.log('✅ Redis working!', { value })
    return true
  } catch (error) {
    console.error('❌ Redis test failed:', error)
    return false
  }
}