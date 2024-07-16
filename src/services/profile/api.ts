import * as schemas from '@/services/profile/schema'
import type * as Types from '@/services/profile/schema'
import { api } from '@/utils/api'

export const getProfile = api<Types.RestProfilRequest, Types.RestProfilResponse>({
  method: 'GET',
  path: '/api/me',
  requestSchema: schemas.RestProfilRequestSchema,
  responseSchema: schemas.RestProfilResponseSchema,
  type: 'private',
})

export const getDetailedProfile = api<Types.RestDetailedProfileRequest, Types.RestDetailedProfileResponse>({
  method: 'GET',
  path: '/api/v3/profile/me',
  requestSchema: schemas.RestDetailedProfileRequestSchema,
  responseSchema: schemas.RestDetailedProfileResponseSchema,
  type: 'private',
})

export const getUserScopes = api<Types.RestUserScopesRequest, Types.RestUserScopesResponse>({
  method: 'GET',
  path: '/api/v3/profile/me/scopes',
  requestSchema: schemas.RestUserScopesRequestSchema,
  responseSchema: schemas.RestUserScopesResponseSchema,
  type: 'private',
})

export const updateProfile = (userUuid: string, request: Types.RestUpdateProfileRequest) =>
  api<typeof request, Types.RestUpdateProfileResponse>({
    method: 'PUT',
    path: `/api/v3/profile/${userUuid}`,
    requestSchema: schemas.RestUpdateProfileRequestSchema,
    responseSchema: schemas.RestUpdateProfileResponseSchema,
    type: 'private',
  })(request)

export const removeProfile = api<Types.RestRemoveProfileRequest, Types.RestRemoveProfileResponse>({
  method: 'post',
  path: '/api/v3/profile/me/remove',
  requestSchema: schemas.RestRemoveProfileRequestSchema,
  responseSchema: schemas.RestRemoveProfileResponseSchema,
  type: 'private',
})
