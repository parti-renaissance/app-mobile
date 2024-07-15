import * as schema from '@/services/refresh-token/schema'
import type * as Types from '@/services/refresh-token/schema'
import { createApi, type Instances } from '@/utils/constructApi'

export const getRefreshToken = (x: Instances) =>
  createApi(x)<Types.RestRefreshTokenRequest, Types.RestRefreshTokenResponse>({
    method: 'POST',
    path: '/oauth/v2/token',
    requestSchema: schema.RestRefreshTokenRequestSchema,
    responseSchema: schema.RestRefreshTokenResponseSchema,
    type: 'public',
  })
