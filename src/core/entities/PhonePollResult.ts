import { PhoningSatisfactionAnswer } from './PhoningSatisfactionAnswer'
import { PollRemoteQuestionResult } from './PollResult'

export interface PhonePollSatisfactionResult {
  satisfactionAnswers: ReadonlyArray<PhoningSatisfactionAnswer>
}

export type PhonePollResult = PollRemoteQuestionResult &
  PhonePollSatisfactionResult
