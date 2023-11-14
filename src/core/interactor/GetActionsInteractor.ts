import ActionsRepository from '../../data/ActionsRepository'
import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { Action } from '../entities/Action'
import { AuthenticationState } from '../entities/AuthenticationState'
import { UserScopeCode } from '../entities/UserScope'

export class GetActionsInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  private actionsRepository = ActionsRepository.getInstance()

  public async execute(): Promise<Array<Action>> {
    const authState =
      await this.authenticationRepository.getAuthenticationState()
    let hasPhoningScope = false
    let hasDoorToDoorScope = false
    if (authState === AuthenticationState.Authenticated) {
      const scopes = await this.profileRepository.getUserScopes()
      hasPhoningScope = scopes.some(
        (scope) => scope.code === UserScopeCode.PHONING,
      )
      hasDoorToDoorScope = scopes.some(
        (scope) => scope.code === UserScopeCode.DOOR_TO_DOOR,
      )
    }
    const actions = this.actionsRepository.getDefaultActions()
    if (hasDoorToDoorScope) {
      actions.push(this.actionsRepository.getDoorToDoorAction())
    }
    if (hasPhoningScope) {
      actions.push(this.actionsRepository.getPhoningAction())
    }
    return actions
  }
}
