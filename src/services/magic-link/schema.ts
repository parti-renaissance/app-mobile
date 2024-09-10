import { z } from 'zod'

export type Slugs = 'adhesion' | 'donation' | 'contribution'

export type RestGetMagicLinkRequest = z.infer<typeof RestGetMagicLinkRequestSchema>
export const RestGetMagicLinkRequestSchema = z.void()

export type RestGetMagicLinkResponse = z.infer<typeof RestGetMagicLinkResponseSchema>
export const RestGetMagicLinkResponseSchema = z.object({
  url: z.string(),
})
