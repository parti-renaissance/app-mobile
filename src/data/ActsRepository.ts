import { Act, ActImage } from '../core/entities/Act'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'

class ActsRepository {
  private static instance: ActsRepository
  private constructor() {}

  private acts: Array<Act> = [
    {
      id: 2,
      title: i18n.t('acts.polls.title'),
      image: ActImage.POLLS,
      screen: Screen.polls,
      subtitle: 'Lorem ipsum lorem ipsum',
    },
    {
      id: 1,
      title: i18n.t('acts.door_to_door.title'),
      image: ActImage.DOOR2DOOR,
      screen: Screen.polls,
      subtitle: 'Lorem ipsum lorem ipsum',
    },
    {
      id: 4,
      title: i18n.t('acts.phoning.title'),
      image: ActImage.PHONING,
      screen: Screen.polls,
      subtitle: 'Lorem ipsum lorem ipsum',
    },
  ]

  public getActs(): Promise<Array<Act>> {
    return new Promise((resolve) => {
      resolve(this.acts)
    })
  }

  public static getInstance(): ActsRepository {
    if (!ActsRepository.instance) {
      ActsRepository.instance = new ActsRepository()
    }
    return ActsRepository.instance
  }
}

export default ActsRepository
