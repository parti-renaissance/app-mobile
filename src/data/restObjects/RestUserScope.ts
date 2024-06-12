export interface RestUserScope {
  code: string // cf https://github.com/EnMarche/en-marche.fr/blob/master/features/api/scopes.feature#L53-L60
  name: string
  zones: Array<RestUserScopeZone>
  apps: Array<string>
  features: Array<string>
}

export interface RestUserScopeZone {
  uuid: string
  code: string
  name: string
}
