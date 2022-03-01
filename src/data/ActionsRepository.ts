import { Action } from '../core/entities/Action'

class ActionsRepository {
  private static instance: ActionsRepository
  private constructor() {}

  public getDefaultActions(): Array<Action> {
    return [Action.fromType('polls')]
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
