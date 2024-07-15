import { z } from 'zod'

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

export type RestGetEventsResponse = z.infer<typeof RestGetEventsResponseSchema>
export const RestGetEventsResponseSchema = z.void()
