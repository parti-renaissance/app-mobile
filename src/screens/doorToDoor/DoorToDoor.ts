export type DoorToDoorDisplayMode = 'map' | 'list'
export type DoorToDoorDisplayFilter = 'all' | 'todo' | 'tofinish' | 'finished'

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
