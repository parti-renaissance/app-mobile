import { ImageSourcePropType } from 'react-native'
import { Tool, ToolImage } from '../../core/entities/Tool'
import Theme from '../../themes/Theme'
import { ToolRowViewModel } from './ToolRowViewModel'

export const ToolRowViewModelMapper = {
  map: (theme: Theme, tools: Array<Tool>): Array<ToolRowViewModel> => {
    return tools.map((tool) => {
      return {
        id: tool.id,
        title: tool.title,
        image: mapImage(theme, tool.image),
      }
    })
  },
}

function mapImage(theme: Theme, image: ToolImage): ImageSourcePropType {
  switch (image) {
    case ToolImage.NEAR:
      return theme.image.near()
    case ToolImage.REFORMS:
      return theme.image.reforms()
    case ToolImage.COVID:
      return theme.image.covid()
    case ToolImage.DESINTOX:
      return theme.image.desintox()
    case ToolImage.ANSWERS:
      return theme.image.answers()
  }
}
