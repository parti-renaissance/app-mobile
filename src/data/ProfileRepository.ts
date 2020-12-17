import { Profile } from '../core/entities/Profile'
import ApiService from './network/ApiService'
import { ProfileFromRestProfileResponseMapper } from './mapper/ProfileFromRestProfileResponseMapper'
import LocalStore from './store/LocalStore'
import { DataSource } from './DataSource'
import CacheManager from './store/CacheManager'
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
        result = await this.cacheManager.getFromCache(cacheKey)
        break
      case 'remote':
        result = await this.apiService.getProfile()
        await this.cacheManager.setInCache(cacheKey, result)
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
