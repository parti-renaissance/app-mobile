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

export interface RestPhoningSatisfactionQuestion {
  code: string
  label: string
  type: 'boolean' // for now only one type, but could be more
}
