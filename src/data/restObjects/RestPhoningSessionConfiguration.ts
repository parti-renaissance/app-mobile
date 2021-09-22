export interface RestPhoningSessionConfiguration {
  call_status: {
    finished: Array<RestPhoningSessionCallStatus>
    interrupted: Array<RestPhoningSessionCallStatus>
  }
  satisfaction_questions: Array<RestPhoningSatisfactionQuestion>
}

export interface RestPhoningSessionCallStatus {
  code: string
  label: string
}

export type RestPhoningSatisfactionQuestion =
  | RestPhoningSatisfactionBooleanQuestion
  | RestPhoningSatisfactionChoiceQuestion
  | RestPhoningSatisfactionRateQuestion

export interface RestPhoningSatisfactionBooleanQuestion {
  code: string
  label: string
  type: 'boolean'
}

export interface RestPhoningSatisfactionChoiceQuestion {
  code: string
  label: string
  type: 'choice'
  choices: Map<string, string>
}

export interface RestPhoningSatisfactionRateQuestion {
  code: string
  label: string
  type: 'note'
  values: Array<number>
}
