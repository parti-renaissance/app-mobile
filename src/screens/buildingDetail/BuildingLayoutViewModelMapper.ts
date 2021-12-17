import { BuildingLayoutFloorCellViewModel } from './BuildingLayoutFloorCell'
import {
  BuildingBlock,
  BuildingBlockFloor,
} from './../../core/entities/BuildingBlock'
import { BuildingLayoutViewModel } from './BuildingLayoutView'
import { BuildingType } from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { BuildingLayoutBlockCardViewModel } from './BuildingLayoutBlockCardView'

export const BuildingLayoutViewModelMapper = {
  map: (
    type: BuildingType,
    blocks: BuildingBlock[],
  ): BuildingLayoutViewModel => {
    return {
      buildings: blocks.map((block) => {
        return blockCardViewModel(block, type)
      }),
    }
  },
}

function blockCardViewModel(
  block: BuildingBlock,
  type: BuildingType,
): BuildingLayoutBlockCardViewModel {
  switch (type) {
    case 'house':
      return {
        buildingTypeName: i18n.t('building.layout.buildingtype.house'),
        buildingTypeIcon: require('../../assets/images/house.png'),
        floors: block.floors.map(floorCellViewModel),
      }
    case 'building':
      return {
        buildingTypeName: i18n.t(
          'building.layout.buildingtype.appartementbuilding',
          { buildingName: block.name },
        ),
        buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
        floors: block.floors.map(floorCellViewModel),
      }
  }
}

function floorCellViewModel(
  floor: BuildingBlockFloor,
): BuildingLayoutFloorCellViewModel {
  return {
    title: i18n.t('building.layout.floorTitle', { floorNumber: floor.number }),
    subtitle: floorCellSubtitle(floor),
  }
}

function floorCellSubtitle(floor: BuildingBlockFloor): string {
  switch (floor.status) {
    case 'completed':
      return i18n.t('building.layout.floor.completedSubtitle')
    case 'ongoing':
      return i18n.t('building.layout.floor.subtitle.ongoing', {
        doorKnocked: floor.visitedDoors.length,
        sruveysCount: floor.nbSurveys,
      })
    case 'todo':
      return i18n.t('building.layout.floor.subtitle.todo')
  }
}
