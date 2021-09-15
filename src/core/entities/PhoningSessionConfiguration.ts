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

export interface PhoningSatisfactionQuestion {
  code: string
  label: string
  type: 'boolean' // for now only one type, but could be more
}
