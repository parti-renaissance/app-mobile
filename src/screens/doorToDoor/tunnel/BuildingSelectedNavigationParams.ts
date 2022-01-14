import { BuildingType } from '../../../core/entities/DoorToDoor'

export interface BuildingSelectedNavigationParams {
  id: string
  block: string
  floor: number
  door: number
  type: BuildingType
}
