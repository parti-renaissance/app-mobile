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

// TODO: (Pierre Felgines) Remove legacy entities
// when regular polls webservices are migrated to v3
export interface RestPollResultAnswerChoiceLegacy {
  surveyQuestion: number
  selectedChoices: ReadonlyArray<string>
}

export type RestPollResultAnswerLegacy =
  | RestPollResultAnswerChoiceLegacy
  | RestPollResultAnswerText
