import { z } from 'zod'
import { createFormErrorResponseSchema, createFormErrorThrower } from '../common/errors/form-errors'
import { propertyPathSchema } from './schema'

const actionFormErrorSchema = createFormErrorResponseSchema(propertyPathSchema)

export class ActionFormError extends Error {
  violations: z.infer<typeof actionFormErrorSchema>['violations']
  constructor(public errors: z.infer<typeof actionFormErrorSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}

export const actionFormErrorThrower = createFormErrorThrower(ActionFormError, actionFormErrorSchema)
