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
        floors: block.floors.map((floor) =>
          floorCellViewModel(block.name, floor),
        ),
      }
    case 'building':
      return {
        buildingTypeName: i18n.t(
          'building.layout.buildingtype.appartementbuilding',
          { buildingName: block.name },
        ),
        buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
        floors: block.floors.map((floor) =>
          floorCellViewModel(block.name, floor),
        ),
      }
  }
}

function floorCellViewModel(
  buildingBlock: string,
  floor: BuildingBlockFloor,
): BuildingLayoutFloorCellViewModel {
  return {
    id: floor.id,
    floorNumber: floor.number,
    buildingBlock: buildingBlock,
    title: i18n.t('building.layout.floorTitle', { floorNumber: floor.number }),
    subtitle: floorCellSubtitle(floor),
    isCompleted: floor.status === 'completed',
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
