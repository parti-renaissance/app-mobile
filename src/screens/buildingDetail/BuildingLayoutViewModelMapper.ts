import { BuildingBlock } from './../../core/entities/BuildingBlock'
import { BuildingLayoutViewModel } from './BuildingLayoutView'
import { BuildingType } from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { BuildingLayoutBlockCardViewModel } from './BuildingLayoutBlockCardView'

export const BuildingLayoutViewModelMapper = {
  map: (
    type: BuildingType,
    blocks: BuildingBlock[],
  ): BuildingLayoutViewModel => {
    return {
      buildings: blocks.map((block) => {
        return blockCardViewModel(block, type)
      }),
    }
  },
}

function blockCardViewModel(
  block: BuildingBlock,
  type: BuildingType,
): BuildingLayoutBlockCardViewModel {
  switch (type) {
    case 'house':
      return {
        buildingTypeName: i18n.t('building.layout.buildingtype.house'),
        buildingTypeIcon: require('../../assets/images/house.png'),
        action: {
          title: i18n.t('building.layout.startaddress'),
          subtitle: '',
        },
      }
    case 'building':
      return {
        buildingTypeName: i18n.t(
          'building.layout.buildingtype.appartementbuilding',
          { buildingName: block.name },
        ),
        buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
        action: {
          title: i18n.t('building.layout.startaddress'),
          subtitle: '',
        },
      }
  }
}
