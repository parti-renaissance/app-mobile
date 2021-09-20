import { PhoningSatisfactionQuestion } from './PhoningSessionConfiguration'

export type PhoningSatisfactionBooleanAnswer = {
  code: PhoningSatisfactionQuestion['code']
  type: 'boolean'
  value: boolean
}

export type PhoningSatisfactionRateAnswer = {
  code: PhoningSatisfactionQuestion['code']
  type: 'rate'
  value: number
}

export type PhoningSatisfactionAnswer =
  | PhoningSatisfactionBooleanAnswer
  | PhoningSatisfactionRateAnswer
