import AuthenticationRepository from "../../data/AuthenticationRepository";
import ProfileRepository from "../../data/ProfileRepository";
import { AuthenticationState } from "../entities/AuthenticationState";

export class LoginInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance();
  private profileRepository = ProfileRepository.getInstance();

  public async login(email: string, password: string): Promise<void> {
    await this.authenticationRepository.login(email, password);
    try {
      const profile = await this.profileRepository.getProfile();
      const zipCode = profile.zipCode;
      await this.profileRepository.saveZipCode(zipCode);
      this.authenticationRepository.dispatchState(AuthenticationState.Authenticated);
    } catch (error) {
      // We need to clean already saved credentials if an error occurs
      // during profile | region fetch
      await this.authenticationRepository.logout();
      throw error;
    }
  }
}
