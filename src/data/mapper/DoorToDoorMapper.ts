import moment from 'moment-timezone'
import { RestDoorToDoorAddress } from '../restObjects/RestDoorToDoorAddress'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'

export const DoorToDoorMapper = {
  map: (restObject: RestDoorToDoorAddress): DoorToDoorAddress => {
    return {
      id: restObject.uuid,
      inseeCode: restObject.insee_code,
      number: restObject.number,
      cityName: restObject.city_name,
      latitude: restObject.latitude,
      longitude: restObject.longitude,
      address: restObject.address,
      votersCount: restObject.voters_count,
      postalCodes: restObject.postal_codes,
      building: {
        type: restObject.building.type,
        id: restObject.building.uuid,
        campaignStatistics: restObject.building.campaign_statistics
          ? {
              numberOfDoors: restObject.building.campaign_statistics.nb_doors,
              numberOfSurveys:
                restObject.building.campaign_statistics.nb_surveys,
              status: restObject.building.campaign_statistics.status,
              id: restObject.building.campaign_statistics.uuid,
              lastPassage: mapLastPassage(
                restObject.building.campaign_statistics.last_passage,
              ),
              campaignId: restObject.building.campaign_statistics.campaign.uuid,
              lastPassageDoneBy: {
                firstName:
                  restObject.building.campaign_statistics.last_passage_done_by
                    .first_name,
                lastName:
                  restObject.building.campaign_statistics.last_passage_done_by
                    .last_name,
                id:
                  restObject.building.campaign_statistics.last_passage_done_by
                    .uuid,
              },
            }
          : null,
      },
    }
  },
}

function mapLastPassage(last_passage: string | null): moment.Moment | null {
  return last_passage ? moment(last_passage) : null
}
