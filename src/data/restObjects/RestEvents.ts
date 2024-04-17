import { z } from 'zod'
import { RestMetadata } from './RestMetadata'

export interface RestEvents {
  metadata: RestMetadata
  items: Array<RestShortEvent>
}

export interface RestEventOrganizer {
  uuid: string
  firstName: string
  lastName: string
}

export type EventVisibility = 'public' | 'private' | 'adherent' | 'adherent_dues'

export interface RestFullShortEvent {
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
  organizer: RestEventOrganizer
  user_registered_at: string | null
  post_address: RestEventAddress | null
  visibility: EventVisibility
  object_state: 'full'
}

export interface RestPartialShortEvent {
  object_state: 'partial'
  begin_at: string
  capacity: null
  category: null
  created_at: null
  finish_at: string
  image_url: null
  live_url: null
  local_finish_at: null
  mode: null
  name: string
  organizer: null
  participants_count: null
  post_address: null
  time_zone: string
  visibility: EventVisibility
  uuid: string
}

export type RestShortEvent = RestFullShortEvent | RestPartialShortEvent

export interface RestEventCategory {
  name: string
  slug: string
  event_group_category: RestEventParentCategory
}

export interface RestEventParentCategory {
  name: string
  slug: string
}

export interface RestFullDetailedEvent {
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
  visibility: EventVisibility
  object_state: 'full'
}

export type RestDetailedEvent = RestFullDetailedEvent | RestPartialShortEvent
export type RestEvent = RestShortEvent | RestDetailedEvent
export type Event = (RestShortEvent & { isShort: true }) | RestDetailedEvent

export const isPartialEvent = (event: Event | RestEvent): event is RestPartialShortEvent => event.object_state === 'partial'
export const isFullEvent = (event: Event | RestEvent): event is (RestFullShortEvent | RestFullDetailedEvent) & { isShort: true | undefined } =>
  event.object_state === 'full'
export const isShortEvent = (event: Event): event is { isShort: true } & RestShortEvent => 'isShort' in event

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

export const PublicSubscribtionFormDataSchema = z.object({
  first_name: z.string().min(1, { message: 'Le prénom ne doit pas être vide' }),
  last_name: z.string().min(1, { message: 'Le nom ne doit pas être vide' }),
  email_address: z.string().email({ message: "L'email_address n'est pas valide" }),
  postal_code: z
    .string()
    .min(4, { message: 'Le code postal doit contenir au minimum 4 chiffres' })
    .max(6, { message: 'Le code postal doit contenir au maximum 6 chiffres' }),
  cgu_accepted: z.boolean().refine((value) => value, { message: 'Vous devez accepter les CGU' }),
  join_newsletter: z.boolean(),
})

export type PublicSubscribtionFormData = z.infer<typeof PublicSubscribtionFormDataSchema>
