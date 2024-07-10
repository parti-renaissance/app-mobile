import { z } from 'zod'

export const RestProfilRequestSchema = z.void()

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

export const RestDetailedProfileRequestSchema = z.void()

export const RestDetailedProfileResponseSchema = z.object({
  uuid: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string(),
  custom_gender: z.string().nullable(),
  nationality: z.string().nullable(),
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
  facebook_page_url: z.string().nullable(),
  twitter_page_url: z.string().nullable(),
  linkedin_page_url: z.string().nullable(),
  telegram_page_url: z.string().nullable(),
  instagram_page_url: z.string().nullable(),
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

export const RestUserScopesRequestSchema = z.void()

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
