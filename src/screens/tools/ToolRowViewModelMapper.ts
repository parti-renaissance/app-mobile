import { ImageSourcePropType } from 'react-native'
import { Tool, ToolImage } from '../../core/entities/Tool'
import { ToolRowViewModel } from './ToolRowViewModel'

export const ToolRowViewModelMapper = {
  map: (tools: Array<Tool>): Array<ToolRowViewModel> => {
    return tools.map((tool) => {
      return {
        id: tool.id,
        title: tool.title,
        image: mapImage(tool.image),
      }
    })
  },
}

function mapImage(image: ToolImage): ImageSourcePropType {
  switch (image) {
    case ToolImage.NEAR:
      return require('../../assets/images/blue/imageProche.png')
    case ToolImage.REFORMS:
      return require('../../assets/images/blue/imageReformes.png')
    case ToolImage.ANOTHERMANDATE:
      return require('../../assets/images/blue/imageAnotherMandate.png')
  }
}
