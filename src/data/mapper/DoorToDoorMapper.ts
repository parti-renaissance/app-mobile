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
      building: restObject.building,
    }
  },
}
