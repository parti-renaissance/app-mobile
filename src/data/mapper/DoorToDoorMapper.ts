import { DoorToDoorAddress } from './../../core/entities/DoorToDoor'
import { RestDoorToDoorAddress } from '../restObjects/RestDoorToDoorAddress'

export const DoorToDoorMapper = {
  map: (restObject: RestDoorToDoorAddress): DoorToDoorAddress | null => {
    const rest_campaign = restObject.building.campaign_statistics
    const buildingType = restObject.building.type
    const campaign = rest_campaign
      ? {
          numberOfDoors: rest_campaign.nb_visited_doors,
          numberOfSurveys: rest_campaign.nb_surveys,
          status: rest_campaign.status,
          id: rest_campaign.uuid,
          lastPassage: mapLastPassage(rest_campaign.last_passage),
          campaignId: rest_campaign.campaign.uuid,
          lastPassageDoneBy: {
            firstName: rest_campaign.last_passage_done_by?.first_name ?? '',
            lastName: rest_campaign.last_passage_done_by?.last_name ?? '',
            id: rest_campaign.last_passage_done_by?.uuid ?? '',
          },
        }
      : null
    if (buildingType !== null) {
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

function mapLastPassage(last_passage: string | null): Date | null {
  return last_passage ? new Date(last_passage) : null
}
