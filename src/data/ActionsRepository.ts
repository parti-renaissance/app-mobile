import { Action, ActionImage } from '../core/entities/Action'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'

class ActionsRepository {
  private static instance: ActionsRepository
  private constructor() {}

  public getDefaultActions(): Array<Action> {
    // Note: (Pierre Felgines) 2022-02-03 We temporary disable polls as free polls
    // do not exist in production yet (they are associated to phoning campaigns or Pap)
    // Once available, replace `return []` with the following lines:
    /// ```
    // return [
    //   {
    //     id: 1,
    //     image: ActionImage.POLLS,
    //     title: i18n.t('actions.polls.title'),
    //     screen: Screen.pollsNavigator,
    //   },
    // ]
    // ```
    return []
  }

  public getDoorToDoorAction(): Action {
    return {
      id: 2,
      image: ActionImage.DOORTODOOR,
      title: i18n.t('actions.door_to_door.title'),
      screen: Screen.doorToDoorNavigator,
    }
  }

  public getPhoningAction(): Action {
    return {
      id: 3,
      image: ActionImage.PHONING,
      title: i18n.t('actions.phoning.title'),
      screen: Screen.phoningNavigator,
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
