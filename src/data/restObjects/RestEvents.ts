import { z } from 'zod'
import { RestMetadata } from './RestMetadata'

export interface RestEvents {
  metadata: RestMetadata
  items: Array<RestEvent>
}

export interface RestEventOrganizer {
  uuid: string
  firstName: string
  lastName: string
}

export type EventVisibility = 'public' | 'private' | 'adherent' | 'adherent_dues'

export interface RestEventCategory {
  name: string
  slug: string
  event_group_category: RestEventParentCategory
}

export interface RestEventParentCategory {
  name: string
  slug: string
}

export type RestEventStatus = 'SCHEDULED' | 'CANCELLED'

export interface RestFullEvent {
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
  status: RestEventStatus
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

export type RestPartialEvent = {
  object_state: 'partial'
  begin_at: string
  finish_at: string
  status: RestEventStatus
  name: string
  time_zone: string
  visibility: EventVisibility
  uuid: string
  committee: null
  slug: null
  description: string
  organizer: null
  participants_count: null
  capacity: null
  visio_url: null
  mode: null
  image_url: null
  user_registered_at: null
  post_address: null
  link: null
  category: null
}

export type RestEvent = {
  object_state: 'full' | 'partial'
  begin_at: string
  finish_at: string
  status: RestEventStatus
  name: string
  time_zone: string
  visibility: EventVisibility
  uuid: string
  committee: RestEventComittee | null
  slug: string | null
  description: string
  organizer: RestEventOrganizer | null
  participants_count: number | null
  capacity: number | null
  visio_url: string | null
  mode: string | null
  image_url: string | null
  user_registered_at: string | null
  post_address: RestEventAddress | null
  link: string | null
  category: RestEventCategory | null
} & (RestFullEvent | RestPartialEvent)

export const isPartialEvent = (event: RestEvent): event is RestPartialEvent => event.object_state === 'partial'
export const isFullEvent = (event: RestEvent): event is RestFullEvent => event.object_state === 'full'

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
