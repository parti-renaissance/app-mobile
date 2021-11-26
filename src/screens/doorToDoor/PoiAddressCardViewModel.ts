import { ImageSourcePropType } from 'react-native'

export interface PoiAddressCardViewModel {
  id: string
  formattedAddress: string
  icon: ImageSourcePropType
  passage: string
  statusIcon: ImageSourcePropType
  note: string
  nbSurveys: number
}
