import { z } from 'zod'

// -----------------  RestProfil  -----------------

export type RestProfilRequest = z.infer<typeof RestProfilRequestSchema>
export const RestProfilRequestSchema = z.void()

export type RestProfilResponse = z.infer<typeof RestProfilResponseSchema>
export const RestProfilResponseSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  uuid: z.string().uuid(),
  postal_code: z.string(),
  email_address: z.string().email(),
  cadre_access: z.boolean(),
  cadre_auth_path: z.string().nullable(),
  certified: z.boolean(),
  country: z.string(),
  detailed_roles: z.array(z.string()),
  email_subscribed: z.boolean(),
  nickname: z.string().nullable(),
  use_nickname: z.boolean(),
  tags: z.array(
    z.object({
      label: z.string(),
      type: z.union([z.literal('sympathisant'), z.literal('adherent'), z.literal('elu'), z.literal('meeting_lille_09_03'), z.literal('procuration')]),
      surveys: z
        .object({
          total: z.number(),
          last_month: z.number(),
        })
        .optional(),
    }),
  ),
})

// -----------------  RestDetailedProfile  -----------------

export type RestDetailedProfileRequest = z.infer<typeof RestDetailedProfileRequestSchema>
export const RestDetailedProfileRequestSchema = z.void()

export type RestDetailedProfileResponse = z.infer<typeof RestDetailedProfileResponseSchema>
export const RestDetailedProfileResponseSchema = z.object({
  uuid: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string(),
  custom_gender: z.string(),
  nationality: z.string(),
  birthdate: z.string(),
  post_address: z
    .object({
      address: z.string().nullable(),
      postal_code: z.string().nullable(),
      city: z.string().nullable(),
      city_name: z.string().nullable(),
      region: z.string().nullable(),
      country: z.string().nullable(),
    })
    .nullable(),
  email_address: z.string().email(),
  facebook_page_url: z.string().optional(),
  twitter_page_url: z.string().optional(),
  linkedin_page_url: z.string().optional(),
  telegram_page_url: z.string().optional(),
  instagram_page_url: z.string().optional(),
  adherent: z.boolean(),
  phone: z.object({
    country: z.string(),
    number: z.string(),
  }),
  interests: z.array(
    z.object({
      code: z.string(),
      label: z.string(),
    }),
  ),
  subscription_types: z.array(
    z.object({
      code: z.string(),
      label: z.string(),
    }),
  ),
})

// -----------------  RestUserScopes  -----------------

export type RestUserScopesRequest = z.infer<typeof RestUserScopesRequestSchema>
export const RestUserScopesRequestSchema = z.void()

export type RestUserScopesResponse = z.infer<typeof RestUserScopesResponseSchema>
export const RestUserScopesResponseSchema = z.array(
  z.object({
    code: z.string(),
    name: z.string(),
    zones: z.array(
      z.object({
        code: z.string(),
        name: z.string(),
        uuid: z.string().uuid(),
      }),
    ),
    apps: z.array(z.string()),
    features: z.array(z.string()),
  }),
)

// -----------------  RestUpdateProfile  -----------------

export type RestUpdateProfileRequest = z.infer<typeof RestUpdateProfileRequestSchema>
export const RestUpdateProfileRequestSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    custom_gender: z.string(),
    nationality: z.string(),
    birthdate: z.string(),
    address: z.object({
      address: z.string(),
      postal_code: z.string(),
      city_name: z.string(),
      country: z.string(),
    }),
    email_address: z.string().email(),
    facebook_page_url: z.string().url(),
    twitter_page_url: z.string().url(),
    linkedin_page_url: z.string().url(),
    instagram_page_url: z.string().url(),
    telegram_page_url: z.string().url(),
  })
  .partial()

export const RestUpdateProfileResponseSchema = RestDetailedProfileRequestSchema
export type RestUpdateProfileResponse = RestDetailedProfileRequest

// -----------------  RestRemoveProfile  -----------------
export type RestRemoveProfileRequest = z.infer<typeof RestRemoveProfileRequestSchema>
export const RestRemoveProfileRequestSchema = z.void()

export type RestRemoveProfileResponse = z.infer<typeof RestRemoveProfileResponseSchema>
export const RestRemoveProfileResponseSchema = z.void()
