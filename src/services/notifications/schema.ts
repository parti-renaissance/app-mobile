import { z } from 'zod'

export type RestSubscriptionTypeResponseSchema = z.infer<typeof RestSubscriptionTypeResponseSchema>
export const RestSubscriptionTypeResponseSchema = z.array(
  z.object({
    type: z.string(),
    code: z.string(),
    label: z.string(),
  }),
)

export type RestSubscriptionTypesRequestSchema = z.infer<typeof RestSubscriptionTypesRequestSchema>
export const RestSubscriptionTypesRequestSchema = z.void()

export type RestReSubscribeConfigResponseSchema = z.infer<typeof RestReSubscribeConfigResponseSchema>
export const RestReSubscribeConfigResponseSchema = z.object({
  url: z.string().url(),
  payload: z.string(),
})

export type RestReSubscribeConfigRequestSchema = z.infer<typeof RestReSubscribeConfigRequestSchema>
export const RestReSubscribeConfigRequestSchema = z.void()
