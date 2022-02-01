import AsyncStorage from '@react-native-async-storage/async-storage'
import { Cache } from 'react-native-cache'
import { CacheMissError } from '../../core/errors'

class CacheManager {
  private static instance: CacheManager
  private cache = new Cache({
    namespace: 'lrem_data_cache',
    policy: {
      maxEntries: 5000,
      stdTTL: 0,
    },
    backend: AsyncStorage,
  })
  private constructor() {}

  async setInCache(cacheKey: string, payload: any) {
    return this.cache.set(cacheKey, JSON.stringify(payload))
  }

  async getFromCache(cacheKey: string): Promise<any | undefined> {
    const cacheResult = await this.cache.get(cacheKey)
    if (cacheResult === undefined) {
      throw new CacheMissError()
    }
    return JSON.parse(cacheResult)
  }

  async removeFromCache(cacheKey: string) {
    return this.cache.remove(cacheKey)
  }

  purgeCache(): Promise<any> {
    return this.cache.clearAll()
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }

    return CacheManager.instance
  }
}

export default CacheManager
