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
  let statusAction: string
  if (block.status === 'completed') {
    statusAction = i18n.t('building.layout.open_building')
  } else {
    statusAction = i18n.t('building.layout.close_building')
  }
  switch (type) {
    case 'house':
      return {
        id: block.id,
        buildingTypeName: i18n.t('building.layout.buildingtype.house'),
        buildingTypeIcon: require('../../assets/images/house.png'),
        floors: block.floors.map((floor) =>
          floorCellViewModel(block.name, floor),
        ),
        local: block.local,
        statusAction: statusAction,
      }
    case 'building':
      return {
        id: block.id,
        buildingTypeName: i18n.t(
          'building.layout.buildingtype.appartementbuilding',
          { buildingName: block.name },
        ),
        buildingTypeIcon: require('../../assets/images/appartementBuilding.png'),
        floors: block.floors.map((floor) =>
          floorCellViewModel(block.name, floor),
        ),
        local: block.local,
        statusAction: statusAction,
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
    title: i18n.t('building.layout.floor_title', {
      count: floor.number,
      floorNumber: floor.number,
      context: floor.number,
    }),
    subtitle: floorCellSubtitle(floor),
    isCompleted: floor.status === 'completed',
    local: floor.local,
  }
}

function floorCellSubtitle(floor: BuildingBlockFloor): string {
  switch (floor.status) {
    case 'completed':
      return i18n.t('building.layout.floor.subtitle.completed')
    case 'ongoing':
      return i18n.t('building.layout.floor.subtitle.ongoing', {
        doorKnocked: floor.visitedDoors.length,
        sruveysCount: floor.nbSurveys,
      })
    case 'todo':
      return i18n.t('building.layout.floor.subtitle.todo')
  }
}
