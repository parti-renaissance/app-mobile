import { getCountryCodeForRegionCode, parsePhoneNumber } from 'awesome-phonenumber'
import { isBefore, subYears } from 'date-fns'
import { z } from 'zod'

const buildReqError = (start: string) => ({
  required_error: `${start} est obligatoire.`,
})

const buildLinkError = (start: string) => `le lien ${start} n’est pas valide.`

export const validateAccountFormSchema = z.object({
  first_name: z.string(buildReqError('Le prénom')),
  last_name: z.string(buildReqError('Le nom')),
  gender: z.string(buildReqError('La civilité')),
  nationality: z.string().length(2, 'Le code pays doit être de deux lettres').optional(),
  birthdate: z.date().refine((birthdate) => isBefore(birthdate, subYears(new Date(), 15)), {
    message: "L'âge doit être d'au moins 15 ans.",
  }),
  post_address: z
    .object({
      address: z.string(buildReqError('L’adresse')),
      postal_code: z.string(buildReqError('Le code postal')),
      city_name: z.string(buildReqError('La ville')),
      country: z.string(buildReqError('Le pays')),
    })
    .refine(
      ({ postal_code, country }) => {
        return !(country === 'FR' && !postal_code)
      },
      {
        path: ['postal_code'],
        message: 'Le code postal est obligatoire pour la France',
      },
    ),
  email_address: z.string(buildReqError("L'adresse email")).email('L’adresse email n’est pas valide'),
  facebook_page_url: z.string().url(buildLinkError('facebook')).optional().nullable(),
  twitter_page_url: z.string().url(buildLinkError('twitter')).optional().nullable(),
  linkedin_page_url: z.string().url(buildLinkError('linkedin')).optional().nullable(),
  instagram_page_url: z.string().url(buildLinkError('instagram')).optional().nullable(),
  telegram_page_url: z.string().url(buildLinkError('telegram')).optional().nullable(),
  phone: z
    .object({
      country: z.string(buildReqError('Le code pays')).refine((x) => getCountryCodeForRegionCode(x) !== undefined, {
        message: 'Le code pays doit être de deux lettres',
      }),
      number: z.string(buildReqError('Le numéro de téléphone')),
    })
    .refine(
      ({ country, number }) => {
        return parsePhoneNumber(number, { regionCode: country }).valid
      },
      {
        message: 'Le numéro de téléphone n’est pas valide',
      },
    ),
})
