import { ImageRequireSource, ImageSourcePropType } from 'react-native'

export interface PoiAddressCardViewModel {
  id: string
  formattedAddress: string
  icon: ImageSourcePropType
  passage: string
  statusIcon: ImageRequireSource
  label: string
  doorsOrVotersLabel: string
}
