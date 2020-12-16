import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import RegionsRepository from '../../data/RegionsRepository'
import { AuthenticationState } from '../entities/AuthenticationState'
import { Department } from '../entities/Department'
import { Profile } from '../entities/Profile'

export class ProfileAnonymousResult {
  public constructor(
    readonly zipCode: string,
    readonly department: Department,
  ) {}
}

export class ProfileAuthenticatedResult {
  public constructor(
    readonly profile: Profile,
    readonly department: Department,
  ) {}
}

export type GetUserProfileInteractorResult =
  | ProfileAnonymousResult
  | ProfileAuthenticatedResult

export class GetUserProfileInteractor {
  private profileRepository = ProfileRepository.getInstance()
  private regionRepository = RegionsRepository.getInstance()
  private authenticationRepository = AuthenticationRepository.getInstance()

  public async execute(): Promise<GetUserProfileInteractorResult> {
    const authenticationState = await this.authenticationRepository.getAuthenticationState()
    const isAnonymous = authenticationState === AuthenticationState.Anonymous
    if (isAnonymous) {
      const zipCode = await this.profileRepository.getZipCode()
      const department = await this.regionRepository.getDepartment(zipCode)
      return new ProfileAnonymousResult(zipCode, department)
    } else {
      const profile = await this.profileRepository.getProfile()
      const department = await this.regionRepository.getDepartment(
        profile.zipCode,
      )
      return new ProfileAuthenticatedResult(profile, department)
    }
  }
}
