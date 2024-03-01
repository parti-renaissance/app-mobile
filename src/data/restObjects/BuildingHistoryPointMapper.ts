import { BuildingHistoryPoint } from '../../core/entities/BuildingHistory'
import { RestBuildingHistoryPoint } from './RestBuildingHistoryPoint'

export const BuildingHistoryPointMapper = {
  map: (restObject: RestBuildingHistoryPoint): BuildingHistoryPoint => {
    return {
      questioner: restObject.questioner.partial_name,
      buildingBlock: restObject.building_block,
      floor: restObject.floor,
      door: restObject.door,
      createdAt: new Date(restObject.created_at),
      status: restObject.status_label,
    }
  },
}
