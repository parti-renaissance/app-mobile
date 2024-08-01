import { z } from 'zod'
import { createFormErrorResponseSchema, createFormErrorThrower } from '../common/errors/form-errors'
import { propertyPathSchema } from './schema'

const profileFormErrorSchema = createFormErrorResponseSchema(propertyPathSchema)

export class ProfileFormError extends Error {
  violations: z.infer<typeof profileFormErrorSchema>['violations']
  constructor(public errors: z.infer<typeof profileFormErrorSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}

export const profileFormErrorThrower = createFormErrorThrower(ProfileFormError, profileFormErrorSchema)
