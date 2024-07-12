import * as schema from '@/services/refresh-token/schema'
import type * as Types from '@/services/refresh-token/schema'
import { api } from '@/utils/api'

export const getRefreshToken = api<Types.RestRefreshTokenRequest, Types.RestRefreshTokenResponse>({
  method: 'POST',
  path: '/oauth/v2/token',
  requestSchema: schema.RestRefreshTokenRequestSchema,
  responseSchema: schema.RestRefreshTokenResponseSchema,
  type: 'public',
})
