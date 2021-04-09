import { Interest } from '../../core/entities/Interest'
import { RestInterestConfiguration } from '../restObjects/RestConfigurations'

export const ConfigurationMapper = {
  mapInterest: (restInterest: RestInterestConfiguration): Interest => {
    return {
      code: restInterest.code,
      label: restInterest.label,
    }
  },
}
