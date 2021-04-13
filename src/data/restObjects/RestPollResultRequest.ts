export interface RestPollResultAnswerChoice {
  surveyQuestion: number
  selectedChoices: ReadonlyArray<string>
}

export interface RestPollResultAnswerText {
  surveyQuestion: number
  textField: string
}

export type RestPollResultAnswer =
  | RestPollResultAnswerChoice
  | RestPollResultAnswerText

export interface RestPollResultRequest {
  survey: number
  type: string
  lastName?: string
  firstName?: string
  emailAddress?: string
  agreedToStayInContact: boolean
  agreedToContactForJoin: boolean
  agreedToTreatPersonalData: boolean
  postalCode?: string
  profession?: string
  ageRange?: string
  gender?: string
  answers: ReadonlyArray<RestPollResultAnswer>
  latitude?: number
  longitude?: number
}
