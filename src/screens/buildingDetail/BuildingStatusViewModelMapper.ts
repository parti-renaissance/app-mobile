import i18n from '../../utils/i18n'
import { BuildingStatus } from './../../core/entities/BuildingStatus'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'

export const BuildingStatusViewModelMapper = {
  map: (status: BuildingStatus): BuildingStatusViewModel => {
    switch (status) {
      case BuildingStatus.DONE:
        return {
          statusTile: i18n.t('building.status.done'),
          statusIcon: require('../../assets/images/buildingStatusDoneIcon.png'),
        }
      case BuildingStatus.TODO:
        return {
          statusTile: i18n.t('building.status.todo'),
          statusIcon: require('../../assets/images/buildingStatusToDoIcon.png'),
        }
      case BuildingStatus.TOCOMPLETE:
        return {
          statusTile: i18n.t('building.status.tocomplete'),
          statusIcon: require('../../assets/images/buildingStatusToCompleteIcon.png'),
        }
    }
  },
}
