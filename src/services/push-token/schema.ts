import { z } from 'zod'

export const RestPostPushTokenRequestSchema = z.object({
  identifier: z.string(),
  source: z.string(),
})

export const RestPostPushTokenResponseSchema = z.array(z.any())
