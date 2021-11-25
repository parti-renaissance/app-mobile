import { ImageSourcePropType } from 'react-native'
import { DoorToDoorDisplayFilterDisplay } from './DoorToDoor'

export interface DoorToDoorFilterViewModel {
  active: boolean
  filter: DoorToDoorDisplayFilterDisplay
  icon?: ImageSourcePropType
  onPress: (mode: DoorToDoorDisplayFilterDisplay) => void
  title: string
}
