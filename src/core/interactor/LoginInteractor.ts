import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import RegionsRepository from '../../data/RegionsRepository'
import ThemeRepository from '../../data/ThemeRepository'
import { AuthenticationState } from '../entities/AuthenticationState'
import RegionTheme from '../entities/RegionTheme'

export class LoginInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  private regionsRepository = RegionsRepository.getInstance()
  private themeRepository = ThemeRepository.getInstance()

  public async login(email: string, password: string): Promise<RegionTheme> {
    await this.authenticationRepository.login(email, password)
    try {
      const profile = await this.profileRepository.getProfile()
      const zipCode = profile.zipCode
      const region = await this.regionsRepository.getRegion(zipCode)
      await this.themeRepository.saveRegionTheme(region.theme)
      await this.profileRepository.saveZipCode(zipCode)
      this.authenticationRepository.dispatchState(
        AuthenticationState.Authenticated,
      )
      return region.theme
    } catch (error) {
      // We need to clean already saved credentials if an error occurs
      // during profile | region fetch
      await this.authenticationRepository.logout()
      throw error
    }
  }
}
