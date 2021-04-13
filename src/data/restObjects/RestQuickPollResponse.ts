export interface RestQuickPollItemChoice {
  uuid: string
  value: string
}

export interface RestQuickPollItemChoiceItem {
  count: number
  percentage: number
  choice: RestQuickPollItemChoice
}

export interface RestQuickPollItemResult {
  total: number
  choices: ReadonlyArray<RestQuickPollItemChoiceItem>
}

export interface RestQuickPollItem {
  uuid: string
  question: string
  finish_at: string
  result: RestQuickPollItemResult
}
