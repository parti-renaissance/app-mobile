export interface QuickPollAnswer {
  id: string
  value: string
  votesCount: number
  votesPercentage: number
}

export interface QuickPollResult {
  totalVotesCount: number
  answers: ReadonlyArray<QuickPollAnswer>
}

export interface QuickPoll {
  id: string
  question: string
  result: QuickPollResult
}
