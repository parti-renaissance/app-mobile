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
