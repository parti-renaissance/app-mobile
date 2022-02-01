import { DoorToDoorAddress } from './../../core/entities/DoorToDoor'
import { StatBlockViewModel } from './StatBlockViewModel'
import i18n from '../../utils/i18n'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'
import NumberFormatter from '../../utils/NumerFormatter'
import { ImageProps } from 'react-native'

export const BuildingStatusViewModelMapper = {
  map: (address: DoorToDoorAddress): BuildingStatusViewModel => {
    let statusTile: string
    let statusIcon: ImageProps
    switch (address.building.campaignStatistics?.status) {
      case 'completed':
        statusTile = i18n.t('building.status.done')
        statusIcon = require('../../assets/images/buildingStatusDoneIcon.png')
        break
      case 'ongoing':
        statusTile = i18n.t('building.status.tocomplete')
        statusIcon = require('../../assets/images/buildingStatusToCompleteIcon.png')
        break
      default:
        statusTile = i18n.t('building.status.todo')
        statusIcon = require('../../assets/images/buildingStatusToDoIcon.png')
        break
    }
    return {
      statusTile: statusTile,
      statusIcon: statusIcon,
      estimatedDoorsStatBlock: estimatedDoorsStatBlock(address.votersCount),
      doorKnockedStatBlock: doorKnockedStatBlock(
        address.building.campaignStatistics?.numberOfDoors ?? 0,
      ),
      completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
        address.building.campaignStatistics?.numberOfSurveys ?? 0,
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

function doorKnockedStatBlock(visitedDoors: number): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.doorKnocked', {
      count: visitedDoors,
    }),
    stat: dataOrPlaceholder(visitedDoors),
  }
}

function completedQuestionnairesStatBlock(surveys: number): StatBlockViewModel {
  return {
    title: i18n.t('building.stats.completedQuestionnaires', {
      count: surveys,
    }),
    stat: dataOrPlaceholder(surveys),
  }
}

function dataOrPlaceholder(data: number | undefined): string {
  return data != null
    ? NumberFormatter.formatDecimal(data)
    : i18n.t('common.noDataPlaceholder')
}
