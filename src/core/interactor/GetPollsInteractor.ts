import AuthenticationRepository from '../../data/AuthenticationRepository'
import { DataSource } from '../../data/DataSource'
import PollsRepository from '../../data/PollsRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { AuthenticationState } from '../entities/AuthenticationState'
import { Poll } from '../entities/Poll'

export class GetPollsInteractor {
  private pollsRepository = PollsRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  private authenticationRepository = AuthenticationRepository.getInstance()

  public async execute(
    dataSource: DataSource = 'remote',
  ): Promise<Array<Poll>> {
    const state = await this.authenticationRepository.getAuthenticationState()
    let zipCode: string | undefined
    if (state === AuthenticationState.Anonymous) {
      zipCode = await this.profileRepository.getZipCode()
    } else {
      zipCode = undefined
    }
    return this.pollsRepository.getPolls(zipCode, dataSource)
  }
}
