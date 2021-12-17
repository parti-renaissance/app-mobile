export interface RestBuildingBlock {
  name: string
  floors: RestBuildingBlockFloor[]
  uuid: string
  status: 'todo' | 'ongoing' | 'completed'
}

export type RestBuildingBlockFloor = {
  number: number
  uuid: string
  status: 'todo' | 'ongoing' | 'completed'
}
