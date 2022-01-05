import { Action, ActionImage } from '../core/entities/Action'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'

class ActionsRepository {
  private static instance: ActionsRepository
  private constructor() {}

  public getDefaultActions(): Array<Action> {
    return [
      {
        id: 1,
        image: ActionImage.POLLS,
        title: i18n.t('actions.polls.title'),
        screen: Screen.polls,
      },
    ]
  }

  public getDoorToDoorAction(): Action {
    return {
      id: 2,
      image: ActionImage.DOORTODOOR,
      title: i18n.t('actions.door_to_door.title'),
      screen: Screen.doorToDoor,
    }
  }

  public getPhoningAction(): Action {
    return {
      id: 3,
      image: ActionImage.PHONING,
      title: i18n.t('actions.phoning.title'),
      screen: Screen.phoning,
    }
  }

  public static getInstance(): ActionsRepository {
    if (!ActionsRepository.instance) {
      ActionsRepository.instance = new ActionsRepository()
    }
    return ActionsRepository.instance
  }
}

export default ActionsRepository
