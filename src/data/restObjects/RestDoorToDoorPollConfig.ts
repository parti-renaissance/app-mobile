export interface RestDoorToDoorPollConfig {
  before_survey: RestDoorToDoorPollConfigBefore
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
}

export interface RestDoorToDoorPollConfigResponseStatus {
  code: string
  label: string
}
