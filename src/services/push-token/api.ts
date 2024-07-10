import * as schemas from '@/services/push-token/schema'
import { api } from '@/utils/api'
import { z } from 'zod'

export const addPushToken = api<z.infer<typeof schemas.RestPostPushTokenRequestSchema>, z.infer<typeof schemas.RestPostPushTokenResponseSchema>>({
  method: 'post',
  path: '/api/v3/push-token',
  requestSchema: schemas.RestPostPushTokenRequestSchema,
  responseSchema: schemas.RestPostPushTokenResponseSchema,
  type: 'private',
})
