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
}

export interface RestEventCategory {
  name: string
}
