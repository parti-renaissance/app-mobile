import { DoorToDoorPollConfig } from '../../core/entities/DoorToDoorPollConfig'
import { RestDoorToDoorPollConfig } from '../restObjects/RestDoorToDoorPollConfig'

export const DoorToDoorPollConfigMapper = {
  map: (restObject: RestDoorToDoorPollConfig): DoorToDoorPollConfig => {
    return {
      before: {
        doorStatus: restObject.before_survey.door_status
          .flat() // TODO remove flat when server removed nested arrays
          .map((item) => {
            return {
              code: item.code,
              label: item.label,
            }
          }),
        responseStatus: restObject.before_survey.response_status
          .flat() // TODO remove flat when server removed nested arrays
          .map((item) => {
            return {
              code: item.code,
              label: item.label,
            }
          }),
      },
    }
  },
}
