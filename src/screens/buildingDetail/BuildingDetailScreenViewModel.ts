import { BuildingHistoryViewModel } from './BuildingVisitsHistoryViewModel'
import { BuildingLayoutViewModel } from './BuildingLayoutViewModel'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'
import { ImageSourcePropType } from 'react-native'

export interface BuildingDetailScreenViewModel {
  address: string
  lastVisit: string
  illustration: ImageSourcePropType
  status: BuildingStatusViewModel
  history: BuildingHistoryViewModel
  buildingLayout: BuildingLayoutViewModel
}
