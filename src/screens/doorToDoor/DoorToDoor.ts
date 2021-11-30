import { ImageSourcePropType } from 'react-native'

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

export type DoorToDoorFilterDisplay = 'all' | 'todo' | 'ongoing' | 'completed'

export interface DoorToDoorFilterProps {
  active: boolean
  filter: DoorToDoorFilterDisplay
  icon?: ImageSourcePropType
  onPress: (mode: DoorToDoorFilterDisplay) => void
  title: string
}
