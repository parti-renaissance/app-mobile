import { z } from 'zod'
import { PersonalInformationsFormSchema } from './validation'

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export type PersonalInformationsForm = z.infer<typeof PersonalInformationsFormSchema>
