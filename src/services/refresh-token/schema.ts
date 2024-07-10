import { z } from 'zod'

export const RefreshTokenAPIRequestSchema = z.object({
  grant_type: z.string(),
  client_id: z.string(),
  refresh_token: z.string(),
})

export const RefreshTokenAPIResponseSchema = z.object({
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  access_token: z.string(),
})
