import { BuildingStatusViewModelMapper } from './BuildingStatusViewModelMapper'
import { ImageSourcePropType } from 'react-native'
import { BuildingDetailScreenViewModel } from './BuildingDetailScreenViewModel'
import { BuildingLayoutViewModelMapper } from './BuildingLayoutViewModelMapper'
import Theme from '../../themes/Theme'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'

export const BuildingDetailScreenViewModelMapper = {
  map: (
    address: DoorToDoorAddress,
    theme: Theme,
  ): BuildingDetailScreenViewModel => {
    const illustration = (): ImageSourcePropType => {
      switch (address.building.type) {
        case 'house':
          return theme.image.house()
        case 'building':
          return theme.image.appartementBuilding()
        case null:
          return theme.image.appartementBuilding()
      }
    }
    return {
      address: address.address,
      lastVisit:
        address.building.campaignStatistics?.lastPassage?.toString() ?? '-',
      illustration: illustration(),
      status: BuildingStatusViewModelMapper.map(
        address.building.campaignStatistics,
      ),
      buildingLayout: BuildingLayoutViewModelMapper.map(address.building.type),
    }
  },
}
