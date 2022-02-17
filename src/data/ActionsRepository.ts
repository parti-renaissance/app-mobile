import { Action } from '../core/entities/Action'

class ActionsRepository {
  private static instance: ActionsRepository
  private constructor() {}

  public getDefaultActions(): Array<Action> {
    // Note: (Pierre Felgines) 2022-02-03 We temporary disable polls as free polls
    // do not exist in production yet (they are associated to phoning campaigns or Pap)
    // Once available, replace `return []` with the following lines:
    /// ```
    // return [Action.fromType('polls')]
    // ```
    return []
  }

  public getDoorToDoorAction(): Action {
    return Action.fromType('doorToDoor')
  }

  public getPhoningAction(): Action {
    return Action.fromType('phoning')
  }

  public static getInstance(): ActionsRepository {
    if (!ActionsRepository.instance) {
      ActionsRepository.instance = new ActionsRepository()
    }
    return ActionsRepository.instance
  }
}

export default ActionsRepository
