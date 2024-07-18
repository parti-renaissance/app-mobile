import * as schemas from '@/services/push-token/schema'
import { api } from '@/utils/api'

export const addPushToken = api({
  method: 'post',
  path: '/api/v3/push-token',
  requestSchema: schemas.RestPostPushTokenRequestSchema,
  responseSchema: schemas.RestPostPushTokenResponseSchema,
  type: 'private',
})
