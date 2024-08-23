import { profileFormErrorThrower } from '@/services/profile/error'
import * as schemas from '@/services/profile/schema'
import type * as Types from '@/services/profile/schema'
import { api } from '@/utils/api'

export const getProfile = api({
  method: 'GET',
  path: '/api/me',
  requestSchema: schemas.RestProfilRequestSchema,
  responseSchema: schemas.RestProfilResponseSchema,
  type: 'private',
})

export const getDetailedProfile = api({
  method: 'GET',
  path: '/api/v3/profile/me',
  requestSchema: schemas.RestDetailedProfileRequestSchema,
  responseSchema: schemas.RestDetailedProfileResponseSchema,
  type: 'private',
})

export const getUserScopes = api({
  method: 'GET',
  path: '/api/v3/profile/me/scopes',
  requestSchema: schemas.RestUserScopesRequestSchema,
  responseSchema: schemas.RestUserScopesResponseSchema,
  type: 'private',
})

export const updateProfile = (userUuid: string, request: Types.RestUpdateProfileRequest) =>
  api({
    method: 'PUT',
    path: `/api/v3/profile/${userUuid}`,
    requestSchema: schemas.RestUpdateProfileRequestSchema,
    responseSchema: schemas.RestUpdateProfileResponseSchema,
    errorThrowers: [profileFormErrorThrower],
    type: 'private',
  })(request)

export const removeProfile = api({
  method: 'post',
  path: '/api/v3/profile/me/remove',
  requestSchema: schemas.RestRemoveProfileRequestSchema,
  responseSchema: schemas.RestRemoveProfileResponseSchema,
  type: 'private',
})

export const getDonations = api({
  method: 'GET',
  path: '/api/v3/profile/me/donations',
  requestSchema: schemas.RestDonationsRequestSchema,
  responseSchema: schemas.RestDonationsResponseSchema,
  type: 'private',
})
