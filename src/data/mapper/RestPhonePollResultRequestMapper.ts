import { PollRemoteQuestionResult } from "../../core/entities/PollResult";
import { RestPhonePollResultRequest } from "../restObjects/RestPhonePollResultRequest";
import { RestPollResultAnswerMapper } from "./RestPollResultAnswerMapper";

export const RestPhonePollResultRequestMapper = {
  map: (pollId: string, result: PollRemoteQuestionResult): RestPhonePollResultRequest => {
    return {
      survey: pollId,
      answers: result.answers.map(RestPollResultAnswerMapper.map),
    };
  },
};
