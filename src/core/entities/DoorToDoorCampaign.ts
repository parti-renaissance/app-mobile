import { Moment } from 'moment-timezone'

export type DoorToDoorCampaign = {
  brief: string
  finishDate: Moment
  goal: number
  id: string
  title: string
}
