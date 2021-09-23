export interface PhoningSessionConfiguration {
  callStatus: {
    finished: Array<PhoningSessionCallStatus>
    interrupted: Array<PhoningSessionCallStatus>
  }
  satisfactionQuestions: Array<PhoningSatisfactionQuestion>
}

export interface PhoningSessionCallStatus {
  code: string
  label: string
}

export type PhoningSatisfactionQuestion =
  | PhoningSatisfactionBooleanQuestion
  | PhoningSatisfactionInputQuestion
  | PhoningSatisfactionChoiceQuestion
  | PhoningSatisfactionRateQuestion

export interface PhoningSatisfactionBooleanQuestion {
  code: string
  label: string
  type: 'boolean'
}

export interface PhoningSatisfactionInputQuestion {
  code: string
  label: string
  type: 'text'
}

export interface PhoningSatisfactionChoiceQuestion {
  code: string
  label: string
  type: 'choice'
  choices: Array<PhoningSatisfactionChoice>
}

export interface PhoningSatisfactionChoice {
  id: string
  content: string
}

export interface PhoningSatisfactionRateQuestion {
  code: string
  label: string
  type: 'note'
  values: Array<number>
}
