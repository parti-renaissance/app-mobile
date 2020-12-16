import ProfileRepository from '../../data/ProfileRepository'
import RegionsRepository from '../../data/RegionsRepository'
import { Department } from '../entities/Department'
import { Profile } from '../entities/Profile'

interface ProfileResult {
  profile: Profile
  department: Department
}

export class GetUserProfileInteractor {
  private profileRepository = ProfileRepository.getInstance()
  private regionRepository = RegionsRepository.getInstance()

  public async execute(): Promise<ProfileResult> {
    const profile = await this.profileRepository.getProfile()
    const department = await this.regionRepository.getDepartment(
      profile.zipCode,
    )
    return {
      department: department,
      profile: profile,
    }
  }
}
