// Redis 客户端配置（Upstash）
import { Redis } from '@upstash/redis';

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

export const redis =
  globalForRedis.redis ??
  new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    // 开发环境如果没有配置，使用内存缓存
    automaticDeserialization: true,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}

// 简单的内存缓存实现（开发环境使用）
class MemoryCache {
  private cache: Map<string, { value: unknown; expiry?: number }>;

  constructor() {
    this.cache = new Map();
  }

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    if (item.expiry && item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return item.value as T;
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    this.cache.set(key, {
      value,
      expiry: ttl ? Date.now() + ttl : undefined,
    });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }
}

export const memoryCache = new MemoryCache();
