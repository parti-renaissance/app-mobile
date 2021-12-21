import { PollExtraQuestionPage } from './PollExtraQuestion'

export interface DoorToDoorPollConfig {
  before: DoorToDoorPollConfigBefore
  after: Array<PollExtraQuestionPage>
}

export interface DoorToDoorPollConfigBefore {
  doorStatus: Array<DoorToDoorPollConfigDoorStatus>
  responseStatus: Array<DoorToDoorPollConfigResponseStatus>
}

export interface DoorToDoorPollConfigDoorStatus {
  code: string
  label: string
}

export interface DoorToDoorPollConfigResponseStatus {
  code: string
  label: string
}
