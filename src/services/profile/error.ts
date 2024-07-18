import { createFormErrorThrower, FormError } from '../errors/form-errors'

export class ProfileFormError extends FormError {}
export const profileFormErrorThrower = createFormErrorThrower(ProfileFormError)
