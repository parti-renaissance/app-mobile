import AuthenticationRepository from "../../data/AuthenticationRepository";
import ProfileRepository from "../../data/ProfileRepository";

export class RemoveAccountInteractor {
  private profileRepository = ProfileRepository.getInstance();
  private authenticationRepository = AuthenticationRepository.getInstance();

  public async execute(): Promise<void> {
    await this.profileRepository.removeAccount();
    await this.authenticationRepository.logout();
  }
}
