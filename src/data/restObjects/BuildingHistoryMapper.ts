import { RestBuildingHistoryPoint } from './RestBuildingHistoryPoint'
import moment from 'moment-timezone'
import { BuildingHistoryPoint } from '../../core/entities/BuildingHistory'

export const BuildingHistoryMapper = {
  map: (restObject: RestBuildingHistoryPoint): BuildingHistoryPoint => {
    return {
      questioner: restObject.questioner.partial_name,
      buildingBlock: restObject.building_block,
      floor: restObject.floor,
      door: restObject.door,
      createdAt: moment(restObject.created_at),
      status: restObject.status_label,
    }
  },
}
