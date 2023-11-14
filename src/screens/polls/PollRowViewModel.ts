import { ImageSourcePropType } from 'react-native'

export interface PollRowViewModel {
  id: string
  image: ImageSourcePropType
  title: string
  subtitle: string
  tag: string
}
