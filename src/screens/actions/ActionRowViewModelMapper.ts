import { ImageSourcePropType } from 'react-native'
import { Action, ActionType } from '../../core/entities/Action'
import i18n from '../../utils/i18n'
import { ActionRowViewModel } from './ActionRowViewModel'

export const ActionRowViewModelMapper = {
  map: (actions: Array<Action>): Array<ActionRowViewModel> => {
    return actions.map(({ id, type }) => {
      return {
        id,
        title: mapTitle(type),
        image: mapImage(type),
      }
    })
  },
}

function mapImage(type: ActionType): ImageSourcePropType {
  switch (type) {
    case 'polls':
      return require('../../assets/images/actionPolls.png')
    case 'retaliation':
      return require('../../assets/images/actionRetaliation.png')
    case 'doorToDoor':
      return require('../../assets/images/actionDoorToDoor.png')
    case 'phoning':
      return require('../../assets/images/actionPhoningV2.png')
  }
}

function mapTitle(type: ActionType): string {
  switch (type) {
    case 'polls':
      return i18n.t('actions.polls.title')
    case 'retaliation':
      return i18n.t('actions.retaliation')
    case 'doorToDoor':
      return i18n.t('actions.door_to_door.title')
    case 'phoning':
      return i18n.t('actions.phoning.title')
  }
}
