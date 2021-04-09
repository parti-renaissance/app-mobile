import { Interest } from '../core/entities/Interest'
import { Notification } from '../core/entities/Notification'
import { ConfigurationMapper } from './mapper/ConfigurationMapper'
import ApiService from './network/ApiService'
import { RestUpdateCentersOfInterestRequest } from './restObjects/RestUpdateProfileRequest'

class PersonalInformationRepository {
  private static instance: PersonalInformationRepository
  private apiService = ApiService.getInstance()
  public static getInstance(): PersonalInformationRepository {
    if (!PersonalInformationRepository.instance) {
      PersonalInformationRepository.instance = new PersonalInformationRepository()
    }
    return PersonalInformationRepository.instance
  }

  public async getAvailableCentersOfInterest(): Promise<Array<Interest>> {
    const configurations = await this.apiService.getProfileAvailableConfiguration()
    return configurations.interests.map(ConfigurationMapper.mapInterest)
  }

  public async getAvailableNotifications(): Promise<Array<Notification>> {
    const configurations = await this.apiService.getProfileAvailableConfiguration()
    return configurations.subscription_types.map(
      ConfigurationMapper.mapSubscriptions,
    )
  }

  public async updateCentersOfInterest(
    profileUuid: string,
    interests: Array<string>,
  ): Promise<void> {
    const request: RestUpdateCentersOfInterestRequest = {
      interests: interests,
    }
    await this.apiService.updateCentersOfInterest(profileUuid, request)
  }
}

export default PersonalInformationRepository
