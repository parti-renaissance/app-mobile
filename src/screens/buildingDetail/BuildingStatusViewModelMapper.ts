import { DoorToDoorAddress } from './../../core/entities/DoorToDoor'
import { StatBlockViewModel } from './StatBlockViewModel'
import i18n from '../../utils/i18n'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'
import NumberFormatter from '../../utils/NumerFormatter'
import { ImageProps } from 'react-native'
import { BuildingBlock } from '../../core/entities/BuildingBlock'

export const BuildingStatusViewModelMapper = {
  map: (
    address: DoorToDoorAddress,
    layout: BuildingBlock[],
  ): BuildingStatusViewModel => {
    let visitedDoors = 0
    let surveys = 0
    layout.forEach((block) => {
      block.floors.forEach((floor) => {
        visitedDoors += floor.visitedDoors.length
        surveys += floor.nbSurveys
      })
    })
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
      doorKnockedStatBlock: doorKnockedStatBlock(visitedDoors),
      completedQuestionnairesStatBlock: completedQuestionnairesStatBlock(
        surveys,
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
