import { RestPhoningSessionAdherent } from '../restObjects/RestPhoningSession'
import { PhoningSessionAdherent } from '../../core/entities/PhoningSessionAdherent'

export const PhoningSessionAdherentMapper = {
  map: (restObject: RestPhoningSessionAdherent): PhoningSessionAdherent => {
    return {
      id: restObject.uuid,
      firstName: restObject.first_name,
      phone: {
        country: restObject.phone.country,
        number: restObject.phone.number,
      },
      gender: restObject.gender !== null ? restObject.gender : undefined,
      age: restObject.age !== null ? restObject.age : undefined,
      city: restObject.city_name !== null ? restObject.city_name : undefined,
      postalCode:
        restObject.postal_code !== null ? restObject.postal_code : undefined,
    }
  },
}
