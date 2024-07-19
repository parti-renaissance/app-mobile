import axios from 'axios'
import { z } from 'zod'

export const FormErrorResponseSchema = z.object({
  violations: z.array(
    z.object({
      propertyPath: z.string(),
      message: z.string(),
    }),
  ),
})

export class FormError extends Error {
  violations: z.infer<typeof FormErrorResponseSchema>['violations']
  constructor(public errors: z.infer<typeof FormErrorResponseSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}

export const formErrorThrower = (error: unknown, FormErrorClass = FormError) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const { success, data } = FormErrorResponseSchema.safeParse(error.response.data)

      if (success) {
        throw new FormErrorClass(data)
      }
    }
  }
  return error
}

export const createFormErrorThrower = (x: typeof FormError) => (error: unknown) => formErrorThrower(error, x)
