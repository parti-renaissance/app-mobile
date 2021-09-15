import { RestPhoningSessionConfiguration } from '../restObjects/RestPhoningSessionConfiguration'
import { PhoningSessionConfiguration } from '../../core/entities/PhoningSessionConfiguration'

export const PhoningSessionConfigurationMapper = {
  map: (
    restObject: RestPhoningSessionConfiguration,
  ): PhoningSessionConfiguration => {
    return {
      callStatus: restObject.call_status,
      satisfactionQuestions: restObject.satisfaction_questions,
    }
  },
}
