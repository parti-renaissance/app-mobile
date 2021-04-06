import { Interest } from '../core/entities/Interest'
import { ConfigurationMapper } from './mapper/ConfigurationMapper'
import ApiService from './network/ApiService'

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
}

export default PersonalInformationRepository
