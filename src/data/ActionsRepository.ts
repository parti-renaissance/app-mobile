import { Action, ActionImage } from '../core/entities/Action'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'

class ActionsRepository {
  private static instance: ActionsRepository
  private constructor() {}

  private actions: Array<Action> = [
    {
      id: 1,
      image: ActionImage.POLLS,
      title: i18n.t('actions.polls.title'),
      screen: Screen.polls,
    },
    {
      id: 2,
      image: ActionImage.DOOR2DOOR,
      title: i18n.t('actions.door_to_door.title'),
      screen: Screen.polls,
    },
  ]

  private phoningAction = {
    id: 3,
    image: ActionImage.PHONING,
    title: i18n.t('actions.phoning.title'),
    screen: Screen.phoning,
  }

  public getActions(enablePhoning: boolean): Promise<Array<Action>> {
    return new Promise((resolve) => {
      resolve(
        enablePhoning ? [...this.actions, this.phoningAction] : this.actions,
      )
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
