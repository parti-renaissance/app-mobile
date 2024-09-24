import { profileElectDeclarationFormErrorThrower, profileElectPaymentFormErrorThrower, profileFormErrorThrower } from '@/services/profile/error'
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
  path: '/api/v3/profile/unregister',
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

export const getElectedProfil = (userUuid: string) =>
  api({
    method: 'GET',
    path: `/api/v3/adherents/${userUuid}/elect`,
    requestSchema: schemas.RestElectedProfileRequestSchema,
    responseSchema: schemas.RestElectedProfileResponseSchema,
    type: 'private',
  })()

export const postElectPayment = api({
  method: 'POST',
  path: '/api/v3/profile/elect-payment',
  requestSchema: schemas.RestElectPaymentRequestSchema,
  responseSchema: schemas.RestElectPaymentResponseSchema,
  errorThrowers: [profileElectPaymentFormErrorThrower],
  type: 'private',
})

export const postElectDeclaration = api({
  method: 'POST',
  path: '/api/v3/profile/elect-declaration',
  requestSchema: schemas.RestElectDeclarationRequestSchema,
  responseSchema: schemas.RestElectDeclarationResponseSchema,
  errorThrowers: [profileElectDeclarationFormErrorThrower],
  type: 'private',
})

export const getNotificationList = (): Promise<{ type: 'email' | 'sms'; label: string; code: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          type: 'sms',
          label: 'Recevoir les informations sur les actions militantes du mouvement par SMS ou MMS',
          code: 'militant_action_sms',
        },
        {
          type: 'email',
          label: 'Recevoir les e-mails de mon animateur(trice) local(e) de comité',
          code: 'subscribed_emails_local_host',
        },
        {
          type: 'email',
          label: 'Recevoir les e-mails nationaux',
          code: 'subscribed_emails_movement_information',
        },
        {
          type: 'email',
          label: 'Recevoir la newsletter hebdomadaire nationale',
          code: 'subscribed_emails_weekly_letter',
        },
        {
          type: 'email',
          label: "Recevoir les e-mails de mon/ma président(e) d'assemblée départementale",
          code: 'subscribed_emails_referents',
        },
        {
          type: 'email',
          label: 'Recevoir les e-mails de mon/ma député(e)',
          code: 'deputy_email',
        },
        {
          type: 'email',
          label: 'Recevoir les e-mails de mes candidat(e)s LaREM',
          code: 'candidate_email',
        },
        {
          type: 'email',
          label: 'Recevoir les e-mails de mon/ma sénateur/trice',
          code: 'senator_email',
        },
      ])
    }, 1000)
  })
}
