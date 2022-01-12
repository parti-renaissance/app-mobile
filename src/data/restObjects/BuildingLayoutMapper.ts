import moment from 'moment-timezone'
import { BuildingBlock } from './../../core/entities/BuildingBlock'
import { RestBuildingBlock } from './RestBuildingBlock'

export const BuildingLayoutMapper = {
  map: (restObject: RestBuildingBlock[]): BuildingBlock[] => {
    return restObject.map((restBlock) => {
      return {
        name: restBlock.name,
        floors: restBlock.floors.map((restFloor) => {
          return {
            number: restFloor.number,
            id: restFloor.uuid,
            status: restFloor.campaign_statistics?.status ?? 'todo',
            nbSurveys: restFloor.campaign_statistics?.nb_surveys ?? 0,
            visitedDoors: restFloor.campaign_statistics?.visited_doors ?? [],
            local: false,
          }
        }),
        id: restBlock.uuid,
        status: restBlock.campaign_statistics?.status ?? 'todo',
        closedBy: restBlock.campaign_statistics?.closed_by ?? undefined,
        closedAt: moment(restBlock.campaign_statistics?.closed_at) ?? undefined,
        local: false,
      }
    })
  },
}
