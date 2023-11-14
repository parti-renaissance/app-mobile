export enum UserScopeCode {
  DOOR_TO_DOOR,
  PHONING,
  NATIONAL,
  DEPUTY,
}

export interface UserScope {
  code: UserScopeCode
}
