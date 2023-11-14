export interface RestPollResultAnswerChoice {
  surveyQuestion: number
  selectedChoices: ReadonlyArray<number>
}

export interface RestPollResultAnswerText {
  surveyQuestion: number
  textField: string
}

export type RestPollResultAnswer =
  | RestPollResultAnswerChoice
  | RestPollResultAnswerText

export interface RestPollResultAnswerChoiceLegacy {
  surveyQuestion: number
  selectedChoices: ReadonlyArray<string>
}

export type RestPollResultAnswerLegacy =
  | RestPollResultAnswerChoiceLegacy
  | RestPollResultAnswerText
