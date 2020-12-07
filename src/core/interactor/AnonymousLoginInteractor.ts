import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { AuthenticationState } from '../entities/AuthenticationState'

export class AnonymousLoginInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()

  public async login(zipCode: string): Promise<void> {
    await this.authenticationRepository.anonymousLogin()
    await this.profileRepository.saveZipCode(zipCode)
    this.authenticationRepository.dispatchState(AuthenticationState.Anonymous)
  }
}
