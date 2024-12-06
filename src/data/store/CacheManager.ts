import { CacheMissError } from '../../core/errors'

class CacheManager {
  private static instance: CacheManager

  private constructor() {}

  async setInCache(cacheKey: string, payload: any) {
    return
  }

  async getFromCache(cacheKey: string): Promise<any | undefined> {
    return {}
  }

  async removeFromCache(cacheKey: string) {
    return
  }

  purgeCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve('e')
    })
  }

  public static getInstance() {
    return
  }
}

export default CacheManager
