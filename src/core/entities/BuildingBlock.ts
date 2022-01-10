import uuid from 'react-native-uuid'
import { BuildingType } from './DoorToDoor'

export interface BuildingBlock {
  name: string
  floors: BuildingBlockFloor[]
  id: string
  status: BuildingBlockStatus
  local: boolean
}

export type BuildingBlockFloor = {
  number: number
  id: string
  status: BuildingBlocFloorStatus
  nbSurveys: number
  visitedDoors: string[]
  local: boolean
}

export type BuildingBlockStatus = 'todo' | 'ongoing' | 'completed'
export type BuildingBlocFloorStatus = 'todo' | 'ongoing' | 'completed'

export class BuildingBlockHelper {
  private HOUSE_DEFAULT_FLOOR_COUNT = 1
  private BUILDING_DEFAULT_FLOOR_COUNT = 3

  public createLocalFloor(name: number): BuildingBlockFloor {
    return {
      number: name,
      id: uuid.v4() as string,
      status: 'todo',
      nbSurveys: 0,
      visitedDoors: [],
      local: true,
    }
  }

  public createLocalBlock(
    name: string,
    buildingType: BuildingType,
  ): BuildingBlock {
    const floorsCount =
      buildingType === 'building'
        ? this.BUILDING_DEFAULT_FLOOR_COUNT
        : this.HOUSE_DEFAULT_FLOOR_COUNT
    const floors = Array.from({ length: floorsCount }, (_, i) =>
      this.createLocalFloor(i),
    )
    return {
      name: name,
      floors: floors,
      id: uuid.v4() as string,
      status: 'todo',
      local: true,
    }
  }
}
