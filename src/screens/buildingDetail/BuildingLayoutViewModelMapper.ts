import { BuildingType } from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { BuildingLayoutViewModel } from './BuildingLayoutViewModel'

export const BuildingLayoutViewModelMapper = {
  map: (type: BuildingType): BuildingLayoutViewModel => {
    switch (type) {
      case 'house':
        return {
          buildingTypeName: i18n.t('building.layout.buildingtype.house'),
          buildingTypeIcon: require('../../assets/images/house.png'),
          layout: {
            actionTitle: i18n.t('building.layout.startaddress'),
            actionSubtitle: '',
          },
        }
      case 'building':
        return {
          buildingTypeName: i18n.t(
            'building.layout.buildingtype.appartementbuilding',
          ),
          buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
          layout: {
            actionTitle: i18n.t('building.layout.startaddress'),
            actionSubtitle: '',
          },
        }
      case null:
        return {
          buildingTypeName: i18n.t(
            'building.layout.buildingtype.appartementbuilding',
          ),
          buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
          layout: {
            actionTitle: i18n.t('building.layout.startaddress'),
            actionSubtitle: '',
          },
        }
    }
  },
}
