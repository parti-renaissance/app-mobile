import { z } from 'zod'

export type RestTimelineFeedRequest = z.infer<typeof RestTimelineFeedRequestSchema>
export const RestTimelineFeedRequestSchema = z.object({
  page: z.number(),
  postal_code: z.string(),
})

export type RestTimelineFeedAddress = z.infer<typeof RestTimelineFeedAddressSchema>
export const RestTimelineFeedAddressSchema = z.object({
  address: z.string().nullable(),
  postal_code: z.string().nullable(),
  city_name: z.string().nullable(),
  country: z.string().nullable(),
})

export const RestTimelineFeedAuthorSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.string().nullable(),
  instance: z.string().nullable(),
  zone: z.string().nullable(),
})

export type RestTimelineFeedItem = z.infer<typeof RestTimelineFeedItemSchema>
export const RestTimelineFeedItemSchema = z.object({
  objectID: z.string(),
  type: z.enum(['news', 'event', 'phoning-campaign', 'pap-campaign', 'survey', 'riposte', 'action']),
  title: z.string().nullable(),
  description: z.string().nullable(),
  author: RestTimelineFeedAuthorSchema.nullable(),
  date: z.string().nullable(),
  begin_at: z.string().nullable(),
  finish_at: z.string().nullable(),
  image: z.string().nullable(),
  address: z.string().nullable(),
  category: z.string().nullable(),
  is_local: z.boolean().nullable(),
  media_type: z.string().nullable(),
  cta_link: z.string().nullable(),
  cta_label: z.string().nullable(),
  url: z.string().nullable(),
  user_registered_at: z.string().nullable().optional(),
  time_zone: z.string().nullable(),
  mode: z.enum(['meeting', 'online']).nullable(),
  post_address: RestTimelineFeedAddressSchema.nullable(),
})

export type RestTimelineFeedResponse = z.infer<typeof RestTimelineFeedResponseSchema>
export const RestTimelineFeedResponseSchema = z.object({
  hits: z.array(RestTimelineFeedItemSchema),
  page: z.number(),
  nbHits: z.number(),
  nbPages: z.number(),
  hitsPerPage: z.number(),
  params: z.string(),
})
