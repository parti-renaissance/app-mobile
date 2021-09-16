import { PhoningSatisfactionQuestion } from './PhoningSessionConfiguration'

export type PhoningSatisfactionAnswer = {
  code: PhoningSatisfactionQuestion['code']
  type: 'boolean'
  value: boolean
}
