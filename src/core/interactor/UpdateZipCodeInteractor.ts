import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'

export class UpdateZipCodeInteractor {
  private profileRepository = ProfileRepository.getInstance()
  private authenticationRepository = AuthenticationRepository.getInstance()

  public async execute(zipCode: string): Promise<void> {
    const deviceId = await this.authenticationRepository.getDeviceId()
    await this.profileRepository.updateDeviceZipCode(deviceId, zipCode)
    await this.profileRepository.saveZipCode(zipCode)
  }
}
