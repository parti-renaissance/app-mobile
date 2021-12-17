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
            status: restFloor.status,
          }
        }),
        id: restBlock.uuid,
        status: restBlock.status,
      }
    })
  },
}
