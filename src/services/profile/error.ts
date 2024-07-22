import { createFormErrorThrower, FormError } from '../common/errors/form-errors'

export class ProfileFormError extends FormError {}
export const profileFormErrorThrower = createFormErrorThrower(ProfileFormError)
