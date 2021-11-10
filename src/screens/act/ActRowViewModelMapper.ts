import { ImageSourcePropType } from 'react-native'
import { Act, ActImage } from '../../core/entities/Act'
import Theme from '../../themes/Theme'
import { ActRowViewModel } from './ActRowViewModel'

export const ActRowViewModelMapper = {
  map: (theme: Theme, acts: Array<Act>): Array<ActRowViewModel> => {
    return acts.map(({ id, title, subtitle, image, screen }) => {
      return {
        id,
        title,
        screen,
        subtitle,
        image: mapImage(theme, image),
      }
    })
  },
}

function mapImage(theme: Theme, image: ActImage): ImageSourcePropType {
  switch (image) {
    case ActImage.POLLS:
      return theme.image.polls()
    case ActImage.DOOR2DOOR:
      return theme.image.door2door()
    case ActImage.PHONING:
      return theme.image.phoning()
  }
}
