import AsyncStorage from '@react-native-async-storage/async-storage'
import { Cache } from 'react-native-cache'

class CacheManager {
  private static instance: CacheManager
  private cache = new Cache({
    namespace: 'lrem_data_cache',
    policy: {
      maxEntries: 5000,
    },
    backend: AsyncStorage,
  })
  private constructor() {}

  async setInCache(cacheKey: string, payload: string) {
    return this.cache.set(cacheKey, payload)
  }

  getFromCache(cacheKey: string): Promise<string | undefined> {
    return this.cache.get(cacheKey)
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
