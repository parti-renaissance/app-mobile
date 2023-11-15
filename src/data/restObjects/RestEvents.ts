import { RestMetadata } from './RestMetadata'

export interface RestEvents {
  metadata: RestMetadata
  items: Array<RestShortEvent>
}

export interface RestShortEvent {
  category: RestEventCategory
  name: string
  time_zone: string
  begin_at: string
  finish_at: string
  capacity: number
  uuid: string
  mode: string
  local_begin_at: string
  local_finish_at: string
  image_url: string | null
  user_registered_at: string | null
  post_address: RestEventAddress | null
}

export interface RestEventCategory {
  name: string
  slug: string
  event_group_category: RestEventParentCategory
}

export interface RestEventParentCategory {
  name: string
  slug: string
}

export interface RestDetailedEvent {
  committee: RestEventComittee | null
  uuid: string
  name: string
  slug: string
  description: string
  time_zone: string
  begin_at: string
  finish_at: string
  organizer: RestEventOrganizer
  participants_count: number
  status: string
  capacity: number
  visio_url: string | null
  mode: string | null
  image_url: string | null
  user_registered_at: string | null
  post_address: RestEventAddress | null
  link: string
  category: RestEventCategory
}

export interface RestEventOrganizer {
  first_name: string
  last_name: string
}

export interface RestEventComittee {
  name: string
  link: string
}

export interface RestEventAddress {
  address: string
  postal_code: string
  city: string
  city_name: string
  country: string
  latitude: number
  longitude: number
}

export interface RestSubscriptionErrorResponse {
  violations: Array<RestSubscriptionViolation>
}

export interface RestSubscriptionViolation {
  propertyPath: string
  title: string
}
