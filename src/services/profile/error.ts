import { z } from 'zod'
import { createFormErrorResponseSchema, createFormErrorThrower } from '../common/errors/form-errors'
import { propertyPathChangePasswordSchema, propertyPathDeclarationPaymentSchema, propertyPathElectPaymentSchema, propertyPathSchema } from './schema'

const profileFormErrorSchema = createFormErrorResponseSchema(propertyPathSchema)
export class ProfileFormError extends Error {
  violations: z.infer<typeof profileFormErrorSchema>['violations']
  constructor(public errors: z.infer<typeof profileFormErrorSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}
export const profileFormErrorThrower = createFormErrorThrower(ProfileFormError, profileFormErrorSchema)

const profileElectPaymentFormErrorSchema = createFormErrorResponseSchema(propertyPathElectPaymentSchema)
export class profileElectPaymentFormError extends Error {
  violations: z.infer<typeof profileElectPaymentFormErrorSchema>['violations']
  constructor(public errors: z.infer<typeof profileElectPaymentFormErrorSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}
export const profileElectPaymentFormErrorThrower = createFormErrorThrower(profileElectPaymentFormError, profileElectPaymentFormErrorSchema)

const profileElectDeclarationFormErrorSchema = createFormErrorResponseSchema(propertyPathDeclarationPaymentSchema)
export class profileElectDeclarationFormError extends Error {
  violations: z.infer<typeof profileElectDeclarationFormErrorSchema>['violations']
  constructor(public errors: z.infer<typeof profileElectDeclarationFormErrorSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}
export const profileElectDeclarationFormErrorThrower = createFormErrorThrower(profileElectDeclarationFormError, profileElectDeclarationFormErrorSchema)

const profilChangePasswordFormErrorSchema = createFormErrorResponseSchema(propertyPathChangePasswordSchema)
export class ProfilChangePasswordFormError extends Error {
  violations: z.infer<typeof profilChangePasswordFormErrorSchema>['violations']
  constructor(public errors: z.infer<typeof profilChangePasswordFormErrorSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}
export const profilChangePasswordFormErrorThrower = createFormErrorThrower(ProfilChangePasswordFormError, profilChangePasswordFormErrorSchema)
