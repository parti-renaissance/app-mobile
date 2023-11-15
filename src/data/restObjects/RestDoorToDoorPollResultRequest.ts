import { RestPollResultAnswer } from './RestPollResultAnswer'

export interface RestDoorToDoorPollResultRequest {
  survey: string
  answers: ReadonlyArray<RestPollResultAnswer>
}
