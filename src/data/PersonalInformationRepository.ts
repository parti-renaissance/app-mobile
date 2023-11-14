import { Interest } from '../core/entities/Interest'
import { Notification } from '../core/entities/Notification'
import { SignUpFormData } from '../core/entities/SignUpFormData'
import { ConfigurationMapper } from './mapper/ConfigurationMapper'
import { RestSignUpRequestMapper } from './mapper/RestSignUpRequestMapper'
import ApiService from './network/ApiService'
import {
  RestUpdateCentersOfInterestRequest,
  RestUpdateSubscriptionsRequest,
} from './restObjects/RestUpdateProfileRequest'

class PersonalInformationRepository {
  private static instance: PersonalInformationRepository
  private apiService = ApiService.getInstance()
  public static getInstance(): PersonalInformationRepository {
    if (!PersonalInformationRepository.instance) {
      PersonalInformationRepository.instance =
        new PersonalInformationRepository()
    }
    return PersonalInformationRepository.instance
  }

  public async signUp(formData: SignUpFormData): Promise<void> {
    const request = RestSignUpRequestMapper.map(formData)
    await this.apiService.signUp(request)
  }

  public async resetPassword(email: string): Promise<void> {
    const request = { email_address: email }
    await this.apiService.resetPassword(request)
  }

  public async getAvailableCentersOfInterest(): Promise<Array<Interest>> {
    const configurations =
      await this.apiService.getProfileAvailableConfiguration()
    return configurations.interests.map(ConfigurationMapper.mapInterest)
  }

  public async getAvailableNotifications(): Promise<Array<Notification>> {
    const configurations =
      await this.apiService.getProfileAvailableConfiguration()
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

  public async updateSubscriptions(
    profileUuid: string,
    subscriptions: Array<string>,
  ): Promise<void> {
    const request: RestUpdateSubscriptionsRequest = {
      subscription_types: subscriptions,
    }
    await this.apiService.updateSubscriptions(profileUuid, request)
  }
}

export default PersonalInformationRepository
