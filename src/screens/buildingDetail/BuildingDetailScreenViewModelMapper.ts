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
      // TODO 30/11/21 (Denis Poifol) Replace stub values with actual data
      address: 'address placeholder',
      // TODO 30/11/21 (Denis Poifol) Replace stub values with actual data
      lastVisit: 'address placeholder',
      illustration: illustration(),
      // TODO 30/11/21 (Denis Poifol) Replace stub values with actual data
      status: BuildingStatusViewModelMapper.map(BuildingStatus.DONE),
      buildingLayout: BuildingLayoutViewModelMapper.map(buildingType),
    }
  },
}
