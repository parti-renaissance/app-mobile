import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import PushRepository from '../../data/PushRepository'
import { Department } from '../entities/Department'

export class UpdateZipCodeInteractor {
  private profileRepository = ProfileRepository.getInstance()
  private authenticationRepository = AuthenticationRepository.getInstance()
  private pushRepository = PushRepository.getInstance()

  public async execute(zipCode: string, department: Department): Promise<void> {
    const deviceId = await this.authenticationRepository.getDeviceId()
    await this.profileRepository.updateDeviceZipCode(deviceId, zipCode)
    await this.profileRepository.saveZipCode(zipCode)

    try {
      await this.pushRepository.synchronizeDepartmentSubscription(department)
      await this.pushRepository.synchronizeRegionSubscription(department.region)
      await this.pushRepository.synchronizeBoroughSubscription(zipCode)
    } catch (error) {
      //no-op
    }
  }
}
