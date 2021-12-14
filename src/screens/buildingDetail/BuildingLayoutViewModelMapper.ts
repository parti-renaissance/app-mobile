import { BuildingLayoutViewModel } from './BuildingLayoutView'
import { BuildingType } from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'

export const BuildingLayoutViewModelMapper = {
  map: (type: BuildingType): BuildingLayoutViewModel => {
    switch (type) {
      case 'house':
        return {
          buildings: [
            {
              buildingTypeName: i18n.t('building.layout.buildingtype.house'),
              buildingTypeIcon: require('../../assets/images/house.png'),
              action: {
                title: i18n.t('building.layout.startaddress'),
                subtitle: '',
              },
            },
          ],
        }
      case 'building':
        return {
          buildings: [
            {
              buildingTypeName: i18n.t(
                'building.layout.buildingtype.appartementbuilding',
              ),
              buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
              action: {
                title: i18n.t('building.layout.startaddress'),
                subtitle: '',
              },
            },
          ],
        }
    }
  },
}
