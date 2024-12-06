import { RestUserScopesResponse } from '@/services/profile/schema'

export const getFormatedScope = (scope: RestUserScopesResponse[number]) => {
  return {
    name: scope.name,
    description: scope.zones.map(({ name, code }) => `${name} (${code})`).join(', '),
  }
}
