import { Gdpr } from '../../core/entities/Gdpr'
import { RestGdpr } from '../restObjects/RestGdpr'

export const GdprMapper = {
  map: (restGdpr: RestGdpr): Gdpr => {
    return {
      content: restGdpr.content,
    }
  },
}
