import { z } from 'zod'

export type RestGetMagicLinkRequest = z.infer<typeof RestGetMagicLinkRequestSchema>
export const RestGetMagicLinkRequestSchema = z.object({
  platform: z.enum(['adhesion', 'donation']),
})

export type RestGetMagicLinkResponse = z.infer<typeof RestGetMagicLinkResponseSchema>
export const RestGetMagicLinkResponseSchema = z.object({
  link: z.string(),
})
