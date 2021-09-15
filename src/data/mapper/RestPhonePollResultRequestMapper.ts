import { PollRemoteQuestionResult } from '../../core/entities/PollResult'
import { RestPhonePollResultRequest } from '../restObjects/RestPhonePollResultRequest'
import { RestPollResultAnswerMapper } from './RestPollResultAnswerMapper'

export const RestPhonePollResultRequestMapper = {
  map: (
    sessionId: string,
    result: PollRemoteQuestionResult,
  ): RestPhonePollResultRequest => {
    return {
      phoning_campaign_history_uuid: sessionId,
      answers: result.answers.map(RestPollResultAnswerMapper.map),
    }
  },
}
