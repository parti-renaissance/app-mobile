import PersonalInformationRepository from '../../data/PersonalInformationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { Interest } from '../entities/Interest'

export class GetCentersOfInterestInteractor {
  private personalInformationRepository = PersonalInformationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()

  public async execute(): Promise<CentersOfInterestInteractorResult> {
    const centersOfInterest = await this.personalInformationRepository.getAvailableCentersOfInterest()
    const userInterests = (await this.profileRepository.getDetailedProfile())
      .interests

    return {
      interests: centersOfInterest,
      userInterests: userInterests,
    }
  }
}

export interface CentersOfInterestInteractorResult {
  interests: Array<Interest>
  userInterests: Array<string>
}
