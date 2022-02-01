export interface ShortEvent {
  uuid: string
  name: string
  category: string
  tag: string
  userRegisteredAt?: Date
  imageUrl?: string
  mode?: EventMode
  dateStart: Date
  dateEnd: Date
}

export enum EventMode {
  MEETING = 'meeting',
  ONLINE = 'online',
}

export interface DetailedEvent {
  uuid: string
  name: string
  description: string
  tag: string
  userRegisteredAt?: Date
  imageUrl?: string
  mode?: EventMode
  dateStart: Date
  dateEnd: Date
  participantsCount: number
  visioUrl?: string
  address?: EventAddress
  organizer: EventOrganizer
  commitee?: Commitee
  timezone: string
  link: string
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

export interface EventFilters {
  subscribedOnly?: boolean
  finishAfter?: Date
  searchText?: string
  mode?: EventMode
}
