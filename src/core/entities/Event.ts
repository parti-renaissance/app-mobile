import { Moment } from 'moment'

export interface ShortEvent {
  uuid: string
  name: string
  tag: string
  userRegisteredAt?: Date
  imageUrl?: string
  mode: EventMode
  dateStart: Moment
  dateEnd: Moment
}

export enum EventMode {
  MEETING,
  ONLINE,
}
