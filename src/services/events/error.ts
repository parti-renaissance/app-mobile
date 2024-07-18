import { createFormErrorThrower, FormError } from '../errors/form-errors'

export class PublicEventSubscriptionFormError extends FormError {}
export const publicEventSubscriptionFormErrorThrower = createFormErrorThrower(PublicEventSubscriptionFormError)
