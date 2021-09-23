import { RestPhoningSessionAdherent } from '../restObjects/RestPhoningSession'
import { PhoningSessionAdherent } from '../../core/entities/PhoningSessionAdherent'

export const PhoningSessionAdherentMapper = {
  map: (restObject: RestPhoningSessionAdherent): PhoningSessionAdherent => {
    return {
      id: restObject.uuid,
      info: restObject.info,
      phone: {
        country: restObject.phone.country,
        number: restObject.phone.number,
      },
      gender: restObject.gender !== null ? restObject.gender : undefined,
    }
  },
}
