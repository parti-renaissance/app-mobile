import { Profile } from '../core/entities/Profile'
import ApiService from './network/ApiService'
import { ProfileFromRestProfileResponseMapper } from './mapper/ProfileFromRestProfileResponseMapper'
import LocalStore from './store/LocalStore'
import { DataSource } from './DataSource'
import CacheManager from './store/CacheManager'
import { CacheMissError } from '../core/errors'
import { RestProfileResponse } from './restObjects/RestProfileResponse'

class ProfileRepository {
  private static instance: ProfileRepository
  private apiService = ApiService.getInstance()
  private localStore = LocalStore.getInstance()
  private cacheManager = CacheManager.getInstance()
  private constructor() {}

  public async getProfile(dataSource: DataSource = 'remote'): Promise<Profile> {
    const cacheKey = 'profile'
    let result: RestProfileResponse
    switch (dataSource) {
      case 'cache':
        const cacheResult = await this.cacheManager.getFromCache(cacheKey)
        if (cacheResult === undefined) {
          throw new CacheMissError()
        }
        result = JSON.parse(cacheResult)
        break
      case 'remote':
        result = await this.apiService.getProfile()
        await this.cacheManager.setInCache(cacheKey, JSON.stringify(result))
        break
    }
    return ProfileFromRestProfileResponseMapper.map(result)
  }

  public async getZipCode(): Promise<string> {
    const userPreferences = await this.localStore.getUserPreferences()
    if (userPreferences?.zipCode) {
      return userPreferences.zipCode
    } else {
      throw new Error('Zipcode not found for user')
    }
  }

  public async saveZipCode(zipCode: string): Promise<void> {
    await this.localStore.storeZipCode(zipCode)
  }

  public static getInstance(): ProfileRepository {
    if (!ProfileRepository.instance) {
      ProfileRepository.instance = new ProfileRepository()
    }
    return ProfileRepository.instance
  }
}

export default ProfileRepository
