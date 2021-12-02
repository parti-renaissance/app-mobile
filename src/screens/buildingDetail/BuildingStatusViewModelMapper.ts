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
        estimatedDoorsStatBlock: estimatedDoorsStatBlock(campaignAddress),
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
            estimatedDoorsStatBlock: estimatedDoorsStatBlock(campaignAddress),
            doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
            completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
              campaignAddress,
            ),
          }
        case 'todo':
          return {
            statusTile: i18n.t('building.status.todo'),
            statusIcon: require('../../assets/images/buildingStatusToDoIcon.png'),
            estimatedDoorsStatBlock: estimatedDoorsStatBlock(campaignAddress),
            doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
            completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
              campaignAddress,
            ),
          }
        case 'ongoing':
          return {
            statusTile: i18n.t('building.status.tocomplete'),
            statusIcon: require('../../assets/images/buildingStatusToCompleteIcon.png'),
            estimatedDoorsStatBlock: estimatedDoorsStatBlock(campaignAddress),
            doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
            completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
              campaignAddress,
            ),
          }
      }
    }
  },
}

function estimatedDoorsStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.estimatedDoors', {
      count: campaignAddress?.numberOfDoors ?? 0,
    }),
    stat:
      campaignAddress?.numberOfDoors.toString() ??
      i18n.t('common.noDataPlaceholder'),
  }
}

function doorKnockedStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.doorKnocked', {
      count: campaignAddress?.numberOfDoors ?? 0,
    }),
    stat:
      campaignAddress?.numberOfDoors.toString() ??
      i18n.t('common.noDataPlaceholder'),
  }
}

function completedQuestionnairesStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.completedQuestionnaires', {
      count: campaignAddress?.numberOfSurveys ?? 0,
    }),
    stat:
      campaignAddress?.numberOfSurveys.toString() ??
      i18n.t('common.noDataPlaceholder'),
  }
}
