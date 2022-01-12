import uuid from 'react-native-uuid'
import { BuildingLayoutFloorCellViewModel } from './BuildingLayoutFloorCell'
import {
  BuildingBlock,
  BuildingBlockFloor,
  BuildingBlockHelper,
} from './../../core/entities/BuildingBlock'
import { BuildingLayoutViewModel } from './BuildingLayoutView'
import {
  BuildingType,
  DoorToDoorAddressStatus,
} from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { BuildingLayoutBlockCardViewModel } from './BuildingLayoutBlockCardView'
import { ImageSourcePropType } from 'react-native'

export const BuildingLayoutViewModelMapper = {
  map: (
    type: BuildingType,
    status: DoorToDoorAddressStatus,
    blocks: BuildingBlock[],
  ): BuildingLayoutViewModel => {
    return {
      buildings: blocks.map((block) => {
        return blockCardViewModel(block, type, status)
      }),
      buildingStatus: status,
    }
  },
}

function blockCardViewModel(
  block: BuildingBlock,
  type: BuildingType,
  status: DoorToDoorAddressStatus,
): BuildingLayoutBlockCardViewModel {
  let statusAction: string
  if (block.status === 'completed') {
    statusAction = i18n.t('building.layout.open_building')
  } else {
    statusAction = i18n.t('building.layout.close_building')
  }

  let buildingTypeName: string
  let buildingTypeIcon: ImageSourcePropType
  switch (type) {
    case 'house':
      buildingTypeName = i18n.t('building.layout.buildingtype.house')
      buildingTypeIcon = require('../../assets/images/house.png')
      break
    case 'building':
      buildingTypeName = i18n.t(
        'building.layout.buildingtype.appartementbuilding',
        { buildingName: block.name },
      )
      buildingTypeIcon = require('../../assets/images/appartementBuilding.png')
  }

  // Create missing floors if necessary
  const floors: Array<BuildingBlockFloor> = []
  let index = 0
  block.floors
    .sort((floor) => floor.number)
    .forEach((floor) => {
      while (floor.number > index) {
        floors.push(new BuildingBlockHelper().createLocalFloor(index))
        index++
      }
      floors.push(floor)
      index = floor.number + 1
    })

  return {
    id: block.id,
    buildingTypeName: buildingTypeName,
    buildingTypeIcon: buildingTypeIcon,
    floors:
      block.status === 'completed'
        ? [floorCompletedCellViewModel(block)]
        : floors.map((floor) => floorCellViewModel(block.name, floor, type)),
    local: block.local,
    statusAction: statusAction,
    removable: status !== 'completed',
    canAddNewFloor: type === 'building' && block.status !== 'completed',
    canUpdateBuildingStatus:
      block.status === 'completed' ||
      block.floors.every((floor) => floor.status === 'completed'),
  }
}

function floorCompletedCellViewModel(
  block: BuildingBlock,
): BuildingLayoutFloorCellViewModel {
  return {
    id: uuid.v4().toString(),
    floorNumber: 0,
    buildingBlock: block.name,
    title: i18n.t('building.layout.floor.title_closed', {
      count: block.floors.length,
      floorsCount: block.floors.length,
    }),
    subtitle: i18n.t('building.layout.floor.subtitle.closed', {
      name: block.closedBy,
      date: block.closedAt?.format('DD MMM. YYYY'),
    }),
    isCompleted: true,
    local: true,
  }
}

function floorCellViewModel(
  buildingBlock: string,
  floor: BuildingBlockFloor,
  type: BuildingType,
): BuildingLayoutFloorCellViewModel {
  return {
    id: floor.id,
    floorNumber: floor.number,
    buildingBlock: buildingBlock,
    title:
      type === 'building'
        ? i18n.t('building.layout.floor.title', {
            count: floor.number + 1,
            floorNumber: floor.number,
          })
        : i18n.t('building.layout.startaddress'),
    subtitle: floorCellSubtitle(floor),
    isCompleted: floor.status === 'completed',
    local: floor.local,
  }
}

function floorCellSubtitle(floor: BuildingBlockFloor): string {
  switch (floor.status) {
    case 'completed':
      return i18n.t('building.layout.floor.subtitle.completed', {
        date: floor.closedAt?.format('DD MMM. YYYY'),
      })
    case 'ongoing':
      return i18n.t('building.layout.floor.subtitle.ongoing', {
        doorKnocked: floor.visitedDoors.length,
        sruveysCount: floor.nbSurveys,
      })
    case 'todo':
      return i18n.t('building.layout.floor.subtitle.todo')
  }
}
