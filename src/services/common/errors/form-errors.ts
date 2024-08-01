import axios from 'axios'
import { z } from 'zod'

export const createFormErrorResponseSchema = <Pathes>(pathsSchema: z.ZodType<Pathes>) =>
  z.object({
    violations: z.array(
      z.object({
        propertyPath: pathsSchema,
        message: z.string(),
      }),
    ),
  })

export const FormErrorResponseSchema = createFormErrorResponseSchema(z.string())

export class FormError extends Error {
  violations: z.infer<typeof FormErrorResponseSchema>['violations']
  constructor(public errors: z.infer<typeof FormErrorResponseSchema>) {
    super('FormError')
    this.violations = errors.violations
  }
}

export const formErrorThrower = (error: unknown, FormErrorClass = FormError, schema = FormErrorResponseSchema) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const { success, data } = schema.safeParse(error.response.data)

      if (success) {
        throw new FormErrorClass(data)
      }
    }
  }
  return error
}

export const createFormErrorThrower =
  (x: typeof FormError, schema = FormErrorResponseSchema) =>
  (error: unknown) =>
    formErrorThrower(error, x, schema)
