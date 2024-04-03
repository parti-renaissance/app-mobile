import { getCountryCodeForRegionCode, parsePhoneNumber } from 'awesome-phonenumber'
import z from 'zod'
import { Gender } from './types'

const isPhoneNumber = (ph: string) => parsePhoneNumber(ph)?.valid
const phoneNumberSchema = z
  .string({
    required_error: 'Le numéro de téléphone est obligatoire',
  })
  .refine(isPhoneNumber, () => ({ message: `Le numéro de téléphone est invalide` }))

const PersonalInformationsFormSchema = z.object({
  firstName: z.string({
    required_error: 'Le prénom est obligatoire',
  }),
  lastName: z.string({
    required_error: 'Le nom est obligatoire',
  }),
  gender: z.nativeEnum(Gender),
  customGender: z.string().optional(),
  nationality: z.string().length(2, 'Le code pays doit être de deux lettres'),
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
  phoneNumber: phoneNumberSchema,
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

export { PersonalInformationsFormSchema }
