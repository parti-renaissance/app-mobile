import { RefreshTokenAPIRequestSchema, RefreshTokenAPIResponseSchema } from '@/services/refresh-token/schema'
import { api } from '@/utils/api'
import { z } from 'zod'

const RefreshTokenRequest = RefreshTokenAPIRequestSchema

const RefreshTokenResponse = RefreshTokenAPIResponseSchema

export const getRefreshToken = api<z.infer<typeof RefreshTokenRequest>, z.infer<typeof RefreshTokenResponse>>({
  method: 'POST',
  path: '/oauth/v2/token',
  requestSchema: RefreshTokenRequest,
  responseSchema: RefreshTokenResponse,
  type: 'public',
})
