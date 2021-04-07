import PersonalInformationRepository from '../../data/PersonalInformationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { Interest } from '../entities/Interest'

export class GetCentersOfInterestInteractor {
  private personalInformationRepository = PersonalInformationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()

  public async execute(): Promise<CentersOfInterestInteractorResult> {
    const centersOfInterest = await this.personalInformationRepository.getAvailableCentersOfInterest()
    const profile = await this.profileRepository.getDetailedProfile()

    return {
      interests: centersOfInterest,
      profileUuid: profile.uuid,
      userInterests: profile.interests,
    }
  }
}

export interface CentersOfInterestInteractorResult {
  profileUuid: string
  interests: Array<Interest>
  userInterests: Array<string>
}
