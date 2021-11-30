import moment from 'moment-timezone'
import { DoorToDoorCampaign } from '../../core/entities/DoorToDoorCampaign'
import { RestDoorToDoorCampaign } from '../restObjects/RestDoorToDoorCampaign'

export const DoorToDoorCampaignMapper = {
  map: (restObject: RestDoorToDoorCampaign): DoorToDoorCampaign => {
    return {
      brief: restObject.uuid,
      finishDate: moment(restObject.finish_at),
      goal: restObject.goal,
      title: restObject.uuid,
      id: restObject.uuid,
    }
  },
}
