import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { AuthenticationState } from '../entities/AuthenticationState'
import { PhoningState } from '../entities/PhoningState'
import { UserScopeCode } from '../entities/UserScope'

export class GetPhoningStateInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()

  public async execute(): Promise<PhoningState> {
    const state = await this.authenticationRepository.getAuthenticationState()
    if (state === AuthenticationState.Authenticated) {
      const scopes = await this.profileRepository.getUserScopes()
      const hasPhoningScope = scopes.some(
        (scope) => scope.code === UserScopeCode.PHONING,
      )
      return hasPhoningScope ? PhoningState.ENABLED : PhoningState.DISABLED
    }
    return PhoningState.DISABLED
  }
}
