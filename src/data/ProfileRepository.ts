import { Profile } from '../core/entities/Profile'
import ApiService from './network/ApiService'
import { ProfileMapper } from './mapper/ProfileMapper'
import LocalStore from './store/LocalStore'
import { DataSource } from './DataSource'
import CacheManager from './store/CacheManager'
import { RestProfileResponse } from './restObjects/RestProfileResponse'
import { DetailedProfile } from '../core/entities/DetailedProfile'

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
    return ProfileMapper.map(result)
  }

  public async getDetailedProfile(): Promise<DetailedProfile> {
    const response = await this.apiService.getDetailedProfile()
    return ProfileMapper.mapDetailedProfile(response)
  }

  public async updateDetailedProfile(
    newProfile: DetailedProfile,
  ): Promise<void> {
    await this.apiService.updateProfile(
      newProfile.uuid,
      ProfileMapper.mapDetailedProfileUpdate(newProfile),
    )
  }

  public async getZipCode(): Promise<string> {
    const userPreferences = await this.localStore.getUserPreferences()
    if (userPreferences?.zipCode) {
      return userPreferences.zipCode
    } else {
      throw new Error('Zipcode not found for user')
    }
  }

  public async getCityFromPostalCode(
    postalCode: string,
  ): Promise<string | undefined> {
    return this.apiService.getCityFromPostalCode(postalCode)
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
