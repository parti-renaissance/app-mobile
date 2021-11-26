import { BuildingStatusViewModelMapper } from './BuildingStatusViewModelMapper'
import { ImageSourcePropType } from 'react-native'
import { BuildingType } from './BuildingLayoutViewModelMapper'
import { BuildingDetailScreenViewModel } from './BuildingDetailScreenViewModel'
import { BuildingLayoutViewModelMapper } from './BuildingLayoutViewModelMapper'
import Theme from '../../themes/Theme'
import { BuildingStatus } from '../../core/entities/BuildingStatus'

export const BuildingDetailScreenViewModelMapper = {
  map: (
    buildingType: BuildingType,
    theme: Theme,
  ): BuildingDetailScreenViewModel => {
    const illustration = (): ImageSourcePropType => {
      switch (buildingType) {
        case BuildingType.HOUSE:
          return theme.image.house()
        case BuildingType.APPARTEMENT_BUILDING:
          return theme.image.appartementBuilding()
      }
    }

    return {
      address: 'address placeholder',
      lastVisit: 'address placeholder',
      illustration: illustration(),
      status: BuildingStatusViewModelMapper.map(BuildingStatus.DONE),
      buildingLayout: BuildingLayoutViewModelMapper.map(buildingType),
    }
  },
}
