import i18n from '../../utils/i18n'
import { BuildingLayoutViewModel } from './BuildingLayoutViewModel'

export const BuildingLayoutViewModelMapper = {
  map: (type: BuildingType): BuildingLayoutViewModel => {
    switch (type) {
      case BuildingType.HOUSE:
        return {
          buildingTypeName: i18n.t('building.layout.buildingtype.house'),
          buildingTypeIcon: require('../../assets/images/house.png'),
        }
      case BuildingType.APPARTEMENT_BUILDING:
        return {
          buildingTypeName: i18n.t(
            'building.layout.buildingtype.appartementbuilding',
          ),
          buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
        }
    }
  },
}

export enum BuildingType {
  HOUSE,
  APPARTEMENT_BUILDING,
}
