import { ImageSourcePropType } from 'react-native'

export interface CentersOfInterestViewModel {
  interests: Array<InterestViewModel>
}

export interface InterestViewModel {
  code: string
  label: string
  image: ImageSourcePropType
  isSelected: boolean
}
