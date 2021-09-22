import { RestPhoningSessionConfiguration } from '../restObjects/RestPhoningSessionConfiguration'
import { PhoningSessionConfiguration } from '../../core/entities/PhoningSessionConfiguration'

export const PhoningSessionConfigurationMapper = {
  map: (
    restObject: RestPhoningSessionConfiguration,
  ): PhoningSessionConfiguration => {
    return {
      callStatus: restObject.call_status,
      satisfactionQuestions: restObject.satisfaction_questions.map(
        (question) => {
          switch (question.type) {
            case 'boolean':
              return question
            case 'choice':
              const choices = new Map(Object.entries(question.choices))
              return {
                code: question.code,
                type: question.type,
                label: question.label,
                choices: Array.from(choices, ([key, value]) => ({
                  id: key,
                  content: value,
                })),
              }
            case 'note':
              return question
          }
        },
      ),
    }
  },
}
