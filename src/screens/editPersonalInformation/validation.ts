import { getCountryCodeForRegionCode, parsePhoneNumber } from 'awesome-phonenumber'
import z from 'zod'
import { Gender } from './types'

const buildError = (start: string) => `${start} est obligatoire.`
const PersonalInformationsFormSchema = z
  .object({
    firstName: z.string({
      required_error: buildError('Le prénom'),
    }),
    lastName: z.string({
      required_error: buildError('Le nom'),
    }),
    gender: z.nativeEnum(Gender),
    customGender: z.string().optional(),
    nationality: z.string().length(2, 'Le code pays doit être de deux lettres').optional(),
    birthdate: z.date().refine(
      (birthdate) => {
        const ageCutoffDate = new Date(birthdate)
        ageCutoffDate.setFullYear(birthdate.getFullYear() + 15)

        return new Date() >= ageCutoffDate
      },
      {
        message: "L'âge doit être d'au moins 15 ans.",
      },
    ),
    addressInput: z.string({
      required_error: buildError('L’adresse'),
    }),
    address: z.object({
      address: z.string({
        required_error: buildError('L’adresse'),
      }),
      city: z.string({
        required_error: buildError('La ville'),
      }),
      postalCode: z.string({
        required_error: buildError('Le code postal'),
      }),
      country: z.string({
        required_error: buildError('Le pays'),
      }),
    }),
    email: z
      .string({
        required_error: buildError('L’adresse e-mail'),
      })
      .email('L’adresse e-mail n’est pas valide'),
    phoneNumber: z.string().optional(),
    phoneCountryCode: z.string().refine((val) => getCountryCodeForRegionCode(val) !== undefined, {
      message: 'Le code pays doit être de deux lettres',
    }),
    // social media
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    telegram: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (!data.phoneNumber) return

    if (!data.phoneNumber && !parsePhoneNumber(data.phoneNumber, { regionCode: data.phoneCountryCode }).valid) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phoneNumber'],
        message: 'Le numéro de téléphone n’est pas valide',
      })
    }
  })
  .superRefine((data, context) => {
    const { postalCode, country } = data.address

    if (country === 'france' && !postalCode) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['address.postalCode'],
        message: buildError('Le code postal'),
      })
    }
  })

export { PersonalInformationsFormSchema }
