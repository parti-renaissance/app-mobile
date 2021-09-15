import { RestPollResultAnswer } from './RestPollResultRequest'

export interface RestPhonePollResultRequest {
  phoning_campaign_history_uuid: string
  answers: ReadonlyArray<RestPollResultAnswer>
}
