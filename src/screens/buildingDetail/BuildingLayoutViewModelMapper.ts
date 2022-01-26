import uuid from 'react-native-uuid'
import { BuildingLayoutFloorCellViewModel } from './BuildingLayoutFloorCell'
import {
  BuildingBlock,
  BuildingBlockFloor,
} from './../../core/entities/BuildingBlock'
import { BuildingLayoutViewModel } from './BuildingLayoutView'
import {
  BuildingType,
  DoorToDoorAddressStatus,
} from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { BuildingLayoutBlockCardViewModel } from './BuildingLayoutBlockCardView'
import { ImageSourcePropType } from 'react-native'
import { formatLocalizedDate } from '../../utils/DateFormatter'

export const BuildingLayoutViewModelMapper = {
  map: (
    type: BuildingType,
    status: DoorToDoorAddressStatus,
    blocks: BuildingBlock[],
  ): BuildingLayoutViewModel => {
    return {
      buildings: blocks.map((block, index) => {
        return blockCardViewModel(block, type, status, index)
      }),
      buildingStatus: status,
    }
  },
}

function blockCardViewModel(
  block: BuildingBlock,
  type: BuildingType,
  addressStatus: DoorToDoorAddressStatus,
  blockIndex: number,
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

  return {
    id: block.id,
    buildingTypeName: buildingTypeName,
    buildingTypeIcon: buildingTypeIcon,
    floors:
      block.status === 'completed'
        ? [floorCompletedCellViewModel(block)]
        : block.floors.map((floor, index) => {
            const canRemoveFloor =
              floor.local &&
              index > 0 &&
              index === block.floors.length - 1 &&
              block.status !== 'completed' &&
              addressStatus !== 'completed'
            return floorCellViewModel(block.name, floor, type, canRemoveFloor)
          }),
    local: block.local,
    status: block.status,
    statusAction: statusAction,
    removable: addressStatus !== 'completed' && blockIndex > 0,
    canAddNewFloor:
      type === 'building' &&
      block.status !== 'completed' &&
      addressStatus !== 'completed',
    canUpdateBuildingStatus:
      addressStatus !== 'completed' &&
      (block.status === 'completed' ||
        block.floors.every((floor) => floor.status === 'completed')),
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
      date: block.closedAt
        ? formatLocalizedDate(block.closedAt, i18n.t('doorToDoor.date_format'))
        : '',
    }),
    isCompleted: true,
    removable: false,
  }
}

function floorCellViewModel(
  buildingBlock: string,
  floor: BuildingBlockFloor,
  type: BuildingType,
  removable: boolean,
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
    removable: removable,
  }
}

function floorCellSubtitle(floor: BuildingBlockFloor): string {
  switch (floor.status) {
    case 'completed':
      return i18n.t('building.layout.floor.subtitle.completed', {
        date: floor.closedAt
          ? formatLocalizedDate(
              floor.closedAt,
              i18n.t('doorToDoor.date_format'),
            )
          : '',
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
