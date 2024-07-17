import { z } from 'zod'
import { createRestPaginationSchema } from '../schema'

export type RestGetEventsRequest = z.infer<typeof RestGetEventsRequestSchema>
export const RestGetEventsRequestSchema = z
  .object({
    'finishAt[strictly_after]': z.string(),
    name: z.string(),
    mode: z.string(),
    'order[subscriptions]': z.string(),
    'order[beginAt]': z.string(),
    zipCode: z.string(),
    subscribedOnly: z.boolean(),
  })
  .partial()
  .merge(z.object({ page: z.number() }))

export const EventVisibilitySchema = z.enum(['public', 'private', 'adherent', 'adherent_dues'])

export const RestEventParentCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
})

export const RestEventCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  event_group_category: RestEventParentCategorySchema,
})

export const RestEventStatusSchema = z.enum(['SCHEDULED', 'CANCELED'])
export const RestEventOrganizerSchema = z.object({
  uuid: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string().nullable(),
  instance: z.string().nullable(),
  zone: z.string().nullable(),
})

export const RestEventComitteeSchema = z.object({
  name: z.string(),
  link: z.string(),
})

export const RestEventAddressSchema = z.object({
  address: z.string().nullable(),
  city: z.string().nullable(),
  city_name: z.string().nullable(),
  postal_code: z.string().nullable(),
  country: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
})

export const RestBaseEventSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  status: RestEventStatusSchema,
  visibility: EventVisibilitySchema,
  begin_at: z.string(),
  finish_at: z.string(),
  time_zone: z.string(),
  organizer: RestEventOrganizerSchema.nullable(),
  image_url: z.string().nullable(),
  category: RestEventCategorySchema,
})

export const RestFullEventSchema = z
  .object({
    object_state: z.literal('full'),
    description: z.string(),
    commitee: RestEventComitteeSchema.optional(),
    participants_count: z.number(),
    capacity: z.number().nullable(),
    visio_url: z.string().nullable(),
    mode: z.enum(['online', 'meeting']).nullable(),
    user_registered_at: z.string().nullable(),
    post_address: RestEventAddressSchema.nullable(),
  })
  .merge(RestBaseEventSchema)

export const RestPartialEventSchema = z
  .object({
    object_state: z.literal('partial'),
  })
  .merge(RestBaseEventSchema)

export const RestEventSchema = RestFullEventSchema.or(RestPartialEventSchema)
export const RestItemEventSchema = RestFullEventSchema.omit({
  description: true,
}).or(RestPartialEventSchema)

export type RestEvent = z.infer<typeof RestEventSchema>
export type RestItemEvent = z.infer<typeof RestItemEventSchema>

export type RestGetEventsResponse = z.infer<typeof RestGetEventsResponseSchema>
export const RestGetEventsResponseSchema = createRestPaginationSchema(RestItemEventSchema)
