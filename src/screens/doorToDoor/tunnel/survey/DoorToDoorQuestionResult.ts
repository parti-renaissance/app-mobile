import { PollExtraAnswer } from '../../../../core/entities/PollExtraAnswer'
import { PollRemoteQuestionResult } from '../../../../core/entities/PollResult'

export interface QualificationResult {
  answers: Array<PollExtraAnswer>
}

export type DoorToDoorPollResult = PollRemoteQuestionResult &
  QualificationResult
