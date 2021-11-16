import { ImageSourcePropType } from 'react-native'
import { Action, ActionImage } from '../../core/entities/Action'
import Theme from '../../themes/Theme'
import { ActionRowViewModel } from './ActionRowViewModel'

export const ActionRowViewModelMapper = {
  map: (theme: Theme, actions: Array<Action>): Array<ActionRowViewModel> => {
    return actions.map(({ id, title, image, screen }) => {
      return {
        id,
        title,
        screen,
        image: mapImage(theme, image),
      }
    })
  },
}

function mapImage(theme: Theme, image: ActionImage): ImageSourcePropType {
  switch (image) {
    case ActionImage.POLLS:
      return theme.image.polls()
    case ActionImage.DOOR2DOOR:
      return theme.image.door2door()
    case ActionImage.PHONING:
      return theme.image.phoning()
  }
}
