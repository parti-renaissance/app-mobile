import { ImageSourcePropType } from 'react-native'

export interface BuildingLayoutViewModel {
  buildingTypeName: string
  buildingTypeIcon: ImageSourcePropType
  layout: HouseLayoutViewModel
}

export interface HouseLayoutViewModel {
  actionTitle: string
}
