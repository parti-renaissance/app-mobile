import { Action, ActionImage } from '../core/entities/Action'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'

class ActionsRepository {
  private static instance: ActionsRepository
  private constructor() {}

  private actions: Array<Action> = [
    {
      id: 2,
      title: i18n.t('actions.polls.title'),
      image: ActionImage.POLLS,
      screen: Screen.polls,
    },
    {
      id: 1,
      title: i18n.t('actions.door_to_door.title'),
      image: ActionImage.DOOR2DOOR,
      screen: Screen.polls,
    },
    {
      id: 4,
      title: i18n.t('actions.phoning.title'),
      image: ActionImage.PHONING,
      screen: Screen.polls,
    },
  ]

  public getActions(): Promise<Array<Action>> {
    return new Promise((resolve) => {
      resolve(this.actions)
    })
  }

  public static getInstance(): ActionsRepository {
    if (!ActionsRepository.instance) {
      ActionsRepository.instance = new ActionsRepository()
    }
    return ActionsRepository.instance
  }
}

export default ActionsRepository
