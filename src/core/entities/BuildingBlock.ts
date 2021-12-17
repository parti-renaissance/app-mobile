export interface BuildingBlock {
  name: string
  floors: BuildingBlockFloor[]
  id: string
  status: BuildingBlockStatus
}

export type BuildingBlockFloor = {
  number: number
  id: string
  status: BuildingBlocFloorStatus
  nbSurveys: number
  visitedDoors: string[]
}

export type BuildingBlockStatus = 'todo' | 'ongoing' | 'completed'
export type BuildingBlocFloorStatus = 'todo' | 'ongoing' | 'completed'
