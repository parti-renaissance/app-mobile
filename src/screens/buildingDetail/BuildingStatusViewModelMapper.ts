import { StatBlockViewModel } from './StatBlockViewModel'
import i18n from '../../utils/i18n'
import { BuildingStatus } from './../../core/entities/BuildingStatus'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'

export const BuildingStatusViewModelMapper = {
  map: (status: BuildingStatus): BuildingStatusViewModel => {
    let encounteredElectorsStatBlock: StatBlockViewModel = {
      title: i18n.t('building.stats.encounteredelectors'),
      // TODO 30/11/21 (Denis Poifol) Replace stub values with actual data
      stat: '12',
    }
    let doorKnockedStatBlock: StatBlockViewModel = {
      title: i18n.t('building.stats.doorknocked'),
      // TODO 30/11/21 (Denis Poifol) Replace stub values with actual data
      stat: '12',
    }
    let completedQuestionnairesStatBlock: StatBlockViewModel = {
      title: i18n.t('building.stats.completedqiestionnaires'),
      // TODO 30/11/21 (Denis Poifol) Replace stub values with actual data
      stat: '12',
    }
    switch (status) {
      case BuildingStatus.DONE:
        return {
          statusTile: i18n.t('building.status.done'),
          statusIcon: require('../../assets/images/buildingStatusDoneIcon.png'),
          encounteredElectorsStatBlock: encounteredElectorsStatBlock,
          doorKnockedStatBlock: doorKnockedStatBlock,
          completedQuestionnairesStatBlock: completedQuestionnairesStatBlock,
        }
      case BuildingStatus.TODO:
        return {
          statusTile: i18n.t('building.status.todo'),
          statusIcon: require('../../assets/images/buildingStatusToDoIcon.png'),
          encounteredElectorsStatBlock: encounteredElectorsStatBlock,
          doorKnockedStatBlock: doorKnockedStatBlock,
          completedQuestionnairesStatBlock: completedQuestionnairesStatBlock,
        }
      case BuildingStatus.TOCOMPLETE:
        return {
          statusTile: i18n.t('building.status.tocomplete'),
          statusIcon: require('../../assets/images/buildingStatusToCompleteIcon.png'),
          encounteredElectorsStatBlock: encounteredElectorsStatBlock,
          doorKnockedStatBlock: doorKnockedStatBlock,
          completedQuestionnairesStatBlock: completedQuestionnairesStatBlock,
        }
    }
  },
}
