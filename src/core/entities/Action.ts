export type ActionType = 'polls' | 'phoning' | 'doorToDoor'

export interface Action {
  id: string
  type: ActionType
}

export const Action = {
  fromType: (type: ActionType): Action => {
    return { id: type, type }
  },
}
