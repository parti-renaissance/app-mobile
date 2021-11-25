export type DoorToDoorDisplayMode = 'map' | 'list'

export type ClusterTypeViewModel = {
  id: number
  geometry: {
    coordinates: number[]
  }
  onPress: () => void
  properties: {
    point_count: number
  }
}

export type DoorToDoorDisplayFilterDisplay =
  | 'all'
  | 'todo'
  | 'tofinish'
  | 'finished'
