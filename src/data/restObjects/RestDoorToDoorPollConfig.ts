import { RestPollConfigQuestionPage } from './RestPollConfigQuestion'

export interface RestDoorToDoorPollConfig {
  before_survey: RestDoorToDoorPollConfigBefore
  after_survey: Array<RestPollConfigQuestionPage>
}

export interface RestDoorToDoorPollConfigBefore {
  address: Array<RestDoorToDoorPollConfigAddress>
  door_status: Array<RestDoorToDoorPollConfigDoorStatus>
  response_status: Array<RestDoorToDoorPollConfigResponseStatus>
}

export interface RestDoorToDoorPollConfigAddress {
  code: string
  label: string
  type: string
}

export interface RestDoorToDoorPollConfigDoorStatus {
  code: string
  label: string
  success_status: boolean
}

export interface RestDoorToDoorPollConfigResponseStatus {
  code: string
  label: string
}
