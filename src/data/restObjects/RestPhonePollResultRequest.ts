import { RestPollResultAnswer } from "./RestPollResultAnswer";

export interface RestPhonePollResultRequest {
  survey: string;
  answers: ReadonlyArray<RestPollResultAnswer>;
}
