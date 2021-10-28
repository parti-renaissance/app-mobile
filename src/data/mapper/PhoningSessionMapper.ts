import { RestPhoningSession } from '../restObjects/RestPhoningSession'
import { PhoningSession } from '../../core/entities/PhoningSession'
import { PhoningSessionAdherentMapper } from './PhoningSessionAdherentMapper'

export const PhoningSessionMapper = {
  map: (restObject: RestPhoningSession): PhoningSession => {
    if (restObject.adherent) {
      return {
        id: restObject.uuid,
        adherent: PhoningSessionAdherentMapper.map(restObject.adherent),
      }
    } else {
      return {
        id: restObject.uuid,
        adherent: undefined,
      }
    }
  },
}
