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

export type PhoningSatisfactionChoiceAnswer = {
  code: PhoningSatisfactionQuestion['code']
  type: 'single_choice'
  value: string
}

export type PhoningSatisfactionAnswer =
  | PhoningSatisfactionBooleanAnswer
  | PhoningSatisfactionRateAnswer
  | PhoningSatisfactionChoiceAnswer
