import {
  PhoningCharterAccepted,
  PhoningCharterNotAccepted,
  PhoningCharterState,
} from '../../core/entities/PhoningCharterState'
import {
  RestPhoningCharter,
  RestPhoningCharterAccepted,
} from '../restObjects/RestPhoningCharter'

export const PhoningCharterMapper = {
  map: (restObject: RestPhoningCharter): PhoningCharterState => {
    if (restObject instanceof RestPhoningCharterAccepted) {
      return new PhoningCharterAccepted()
    } else {
      return new PhoningCharterNotAccepted(restObject.content)
    }
  },
}
