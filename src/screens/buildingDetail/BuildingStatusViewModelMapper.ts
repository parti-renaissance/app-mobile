import { DoorToDoorAddressCampaign } from './../../core/entities/DoorToDoor'
import { StatBlockViewModel } from './StatBlockViewModel'
import i18n from '../../utils/i18n'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'
import NumberFormatter from '../../utils/NumerFormatter'
import { ImageProps } from 'react-native'

export const BuildingStatusViewModelMapper = {
  map: (
    campaignAddress: DoorToDoorAddressCampaign,
  ): BuildingStatusViewModel => {
    let statusTile: string
    let statusIcon: ImageProps
    switch (campaignAddress?.status) {
      case 'completed':
        statusTile = i18n.t('building.status.done')
        statusIcon = require('../../assets/images/buildingStatusDoneIcon.png')
        break
      case 'todo':
        statusTile = i18n.t('building.status.todo')
        statusIcon = require('../../assets/images/buildingStatusToDoIcon.png')
        break
      case 'ongoing':
        statusTile = i18n.t('building.status.tocomplete')
        statusIcon = require('../../assets/images/buildingStatusToCompleteIcon.png')
        break
      default:
        statusTile = i18n.t('building.status.done')
        statusIcon = require('../../assets/images/buildingStatusDoneIcon.png')
        break
    }
    return {
      statusTile: statusTile,
      statusIcon: statusIcon,
      estimatedDoorsStatBlock: estimatedDoorsStatBlock(campaignAddress),
      doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
      completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
        campaignAddress,
      ),
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
    stat: dataOrPlaceholder(undefined), // TODO update when data is available on server
  }
}

function doorKnockedStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.doorKnocked', {
      count: campaignAddress?.numberOfDoors ?? 0,
    }),
    stat: dataOrPlaceholder(campaignAddress?.numberOfDoors),
  }
}

function completedQuestionnairesStatBlock(
  campaignAddress: DoorToDoorAddressCampaign,
): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.completedQuestionnaires', {
      count: campaignAddress?.numberOfSurveys ?? 0,
    }),
    stat: dataOrPlaceholder(campaignAddress?.numberOfSurveys),
  }
}

function dataOrPlaceholder(data: number | undefined): string {
  return data != null
    ? NumberFormatter.formatDecimal(data)
    : i18n.t('common.noDataPlaceholder')
}
