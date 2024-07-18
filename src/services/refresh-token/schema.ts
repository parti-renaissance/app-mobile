import { z } from 'zod'

export type RestRefreshTokenRequest = z.infer<typeof RestRefreshTokenRequestSchema>
export const RestRefreshTokenRequestSchema = z.object({
  grant_type: z.string(),
  client_id: z.string(),
  refresh_token: z.string(),
})

export type RestRefreshTokenResponse = z.infer<typeof RestRefreshTokenResponseSchema>
export const RestRefreshTokenResponseSchema = z.object({
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  access_token: z.string(),
})
