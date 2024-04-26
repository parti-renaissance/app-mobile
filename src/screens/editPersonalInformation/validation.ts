import { getCountryCodeForRegionCode, parsePhoneNumber } from 'awesome-phonenumber'
import z from 'zod'
import { Gender } from './types'

const PersonalInformationsFormSchema = z
  .object({
    firstName: z.string({
      required_error: 'Le prénom est obligatoire',
    }),
    lastName: z.string({
      required_error: 'Le nom est obligatoire',
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
    addressInput: z.string(),
    address: z.object({
      address: z.string({
        required_error: 'L’adresse est obligatoire',
      }),
      city: z.string({
        required_error: 'La ville est obligatoire',
      }),
      postalCode: z.string({
        required_error: 'Le code postal est obligatoire',
      }),
      country: z.string({
        required_error: 'Le pays est obligatoire',
      }),
    }),
    email: z
      .string({
        required_error: 'L’adresse e-mail est obligatoire',
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

export { PersonalInformationsFormSchema }
