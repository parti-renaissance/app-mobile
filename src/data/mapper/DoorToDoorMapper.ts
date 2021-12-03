import { DoorToDoorAddress } from './../../core/entities/DoorToDoor'
import moment from 'moment-timezone'
import { RestDoorToDoorAddress } from '../restObjects/RestDoorToDoorAddress'

export const DoorToDoorMapper = {
  map: (restObject: RestDoorToDoorAddress): DoorToDoorAddress | null => {
    const rest_campaign = restObject.building.campaign_statistics
    const buildingType = restObject.building.type
    if (rest_campaign !== null && buildingType !== null) {
      const campaign = {
        numberOfDoors: rest_campaign.nb_doors,
        numberOfSurveys: rest_campaign.nb_surveys,
        status: rest_campaign.status,
        id: rest_campaign.uuid,
        lastPassage: mapLastPassage(rest_campaign.last_passage),
        campaignId: rest_campaign.campaign.uuid,
        lastPassageDoneBy: {
          firstName: rest_campaign.last_passage_done_by.first_name,
          lastName: rest_campaign.last_passage_done_by.last_name,
          id: rest_campaign.last_passage_done_by.uuid,
        },
      }
      const building = {
        type: buildingType,
        id: restObject.building.uuid,
        campaignStatistics: campaign,
      }
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
        building: building,
      }
    } else {
      return null
    }
  },
}

function mapLastPassage(last_passage: string | null): moment.Moment | null {
  return last_passage ? moment(last_passage) : null
}
