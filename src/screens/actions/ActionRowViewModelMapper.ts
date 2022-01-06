import { ImageSourcePropType } from 'react-native'
import { Action, ActionImage } from '../../core/entities/Action'
import { ActionRowViewModel } from './ActionRowViewModel'

export const ActionRowViewModelMapper = {
  map: (actions: Array<Action>): Array<ActionRowViewModel> => {
    return actions.map(({ id, title, image, screen }) => {
      return {
        id,
        title,
        screen,
        image: mapImage(image),
      }
    })
  },
}

function mapImage(image: ActionImage): ImageSourcePropType {
  switch (image) {
    case ActionImage.POLLS:
      return require('../../assets/images/blue/imagePolls.png')
    case ActionImage.DOORTODOOR:
      return require('../../assets/images/blue/imageDoorToDoor.png')
    case ActionImage.PHONING:
      return require('../../assets/images/blue/imagePhoningV2.png')
  }
}
