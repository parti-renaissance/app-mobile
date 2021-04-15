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

export interface DetailedEvent {
  uuid: string
  name: string
  description: string
  tag: string
  userRegisteredAt?: Moment
  imageUrl?: string
  mode: EventMode
  dateStart: Moment
  dateEnd: Moment
  participantsCount: number
  visioUrl?: string
  address?: EventAddress
  organizer: EventOrganizer
  commitee: Commitee
}

export interface EventAddress {
  address: string
  postalCode: string
  city: string
  country: string
  longitude: number
  latitude: number
}

export interface EventOrganizer {
  firstName: string
  lastName: string
}

export interface Commitee {
  name: string
  url: string
}
