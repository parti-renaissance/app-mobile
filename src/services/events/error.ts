import { createFormErrorThrower, FormError } from '../common/errors/form-errors'

export class PublicEventSubscriptionFormError extends FormError {}
export const publicEventSubscriptionFormErrorThrower = createFormErrorThrower(PublicEventSubscriptionFormError)
