import { DoorToDoorAddressCampaign } from './../../core/entities/DoorToDoor'
import { StatBlockViewModel } from './StatBlockViewModel'
import i18n from '../../utils/i18n'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'

export const BuildingStatusViewModelMapper = {
  map: (
    campaignAddress: DoorToDoorAddressCampaign,
  ): BuildingStatusViewModel => {
    if (campaignAddress == null) {
      return {
        statusTile: i18n.t('building.status.done'),
        statusIcon: require('../../assets/images/buildingStatusDoneIcon.png'),
        encounteredElectorsStatBlock: encounteredElectorsStatBlock(
          campaignAddress,
        ),
        doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
        completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
          campaignAddress,
        ),
      }
    } else {
      switch (campaignAddress.status) {
        case 'completed':
          return {
            statusTile: i18n.t('building.status.done'),
            statusIcon: require('../../assets/images/buildingStatusDoneIcon.png'),
            encounteredElectorsStatBlock: encounteredElectorsStatBlock(
              campaignAddress,
            ),
            doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
            completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
              campaignAddress,
            ),
          }
        case 'todo':
          return {
            statusTile: i18n.t('building.status.todo'),
            statusIcon: require('../../assets/images/buildingStatusToDoIcon.png'),
            encounteredElectorsStatBlock: encounteredElectorsStatBlock(
              campaignAddress,
            ),
            doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
            completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
              campaignAddress,
            ),
          }
        case 'ongoing':
          return {
            statusTile: i18n.t('building.status.tocomplete'),
            statusIcon: require('../../assets/images/buildingStatusToCompleteIcon.png'),
            encounteredElectorsStatBlock: encounteredElectorsStatBlock(
              campaignAddress,
            ),
            doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
            completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
              campaignAddress,
            ),
          }
      }
    }
  },
}

function encounteredElectorsStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.encounteredelectors'),
    stat: campaignAddress?.numberOfDoors.toString() ?? '-',
  }
}

function doorKnockedStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.doorknocked'),
    stat: campaignAddress?.numberOfDoors.toString() ?? '-',
  }
}

function completedQuestionnairesStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.completedqiestionnaires'),
    stat: campaignAddress?.numberOfSurveys.toString() ?? '-',
  }
}
