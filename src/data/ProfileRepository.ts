import { Profile } from '../core/entities/Profile'
import ApiService from './network/ApiService'
import { ProfileFromRestProfileResponseMapper } from './mapper/ProfileFromRestProfileResponseMapper'
import LocalStore from './store/LocalStore'

class ProfileRepository {
  private static instance: ProfileRepository
  private apiService = ApiService.getInstance()
  private localStore = LocalStore.getInstance()
  private constructor() {}

  public async getProfile(): Promise<Profile> {
    const result = await this.apiService.getProfile()
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
