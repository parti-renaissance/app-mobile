import {
  DoorToDoorAddress,
  DoorToDoorAddressCampaign,
} from './../../core/entities/DoorToDoor'
import { StatBlockViewModel } from './StatBlockViewModel'
import i18n from '../../utils/i18n'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'
import NumberFormatter from '../../utils/NumerFormatter'
import { ImageProps } from 'react-native'

export const BuildingStatusViewModelMapper = {
  map: (address: DoorToDoorAddress): BuildingStatusViewModel => {
    const campaignAddress = address.building.campaignStatistics
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
      estimatedDoorsStatBlock: estimatedDoorsStatBlock(address.votersCount),
      doorKnockedStatBlock: doorKnockedStatBlock(campaignAddress),
      completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
        campaignAddress,
      ),
    }
  },
}

function estimatedDoorsStatBlock(votersCount: number): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.estimatedDoors', {
      count: votersCount ?? 0,
    }),
    stat: dataOrPlaceholder(votersCount),
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
