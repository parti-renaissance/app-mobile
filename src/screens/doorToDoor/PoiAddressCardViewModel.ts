import { ImageRequireSource, ImageSourcePropType } from 'react-native'

export interface PoiAddressCardViewModel {
  id: string
  interactable: boolean
  formattedAddress: string
  icon: ImageSourcePropType
  passage: string
  statusIcon: ImageRequireSource
  mapStatusIcon: ImageRequireSource
  label: string
  doorsOrVotersLabel: string
}
