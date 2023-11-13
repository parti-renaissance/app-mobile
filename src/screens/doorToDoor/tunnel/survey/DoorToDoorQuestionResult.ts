import { PollExtraAnswer } from "../../../../core/entities/PollExtraAnswer";
import { PollRemoteQuestionResult } from "../../../../core/entities/PollResult";

export interface QualificationResult {
  qualificationAnswers: ReadonlyArray<PollExtraAnswer>;
}

export type DoorToDoorPollResult = PollRemoteQuestionResult & QualificationResult;
