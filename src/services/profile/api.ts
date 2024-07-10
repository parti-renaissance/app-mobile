import * as schemas from '@/services/profile/schema'
import { api } from '@/utils/api'
import { z } from 'zod'

export const getProfile = api<z.infer<typeof schemas.RestProfilRequestSchema>, z.infer<typeof schemas.RestProfilResponseSchema>>({
  method: 'GET',
  path: '/api/me',
  requestSchema: schemas.RestProfilRequestSchema,
  responseSchema: schemas.RestProfilResponseSchema,
  type: 'private',
})

export const getDetailedProfile = api<z.infer<typeof schemas.RestDetailedProfileRequestSchema>, z.infer<typeof schemas.RestDetailedProfileResponseSchema>>({
  method: 'GET',
  path: '/api/profile/me',
  requestSchema: schemas.RestDetailedProfileRequestSchema,
  responseSchema: schemas.RestDetailedProfileResponseSchema,
  type: 'private',
})

export const getUserScopes = api<z.infer<typeof schemas.RestUserScopesRequestSchema>, z.infer<typeof schemas.RestUserScopesResponseSchema>>({
  method: 'GET',
  path: '/api/v3/profile/me/scopes',
  requestSchema: schemas.RestUserScopesRequestSchema,
  responseSchema: schemas.RestUserScopesResponseSchema,
  type: 'private',
})
