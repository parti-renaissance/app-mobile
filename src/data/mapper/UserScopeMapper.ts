import { UserScope, UserScopeCode } from '../../core/entities/UserScope'
import { RestUserScope } from '../restObjects/RestUserScope'

export const UserScopeMapper = {
  map: (scopes: Array<RestUserScope>): Array<UserScope> => {
    return scopes.map((scope) => {
      switch (scope.code) {
        case 'phoning':
          return { code: UserScopeCode.PHONING }
        case 'national':
          return { code: UserScopeCode.NATIONAL }
        case 'deputy':
          return { code: UserScopeCode.DEPUTY }
      }
    })
  },
}
