import {
  ServerTimeoutError,
  InternalServerError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  DepartmentNotFoundError,
} from '../../core/errors'
import i18n from '../../utils/i18n'

export const GenericErrorMapper = {
  mapErrorMessage: (error: Error): string => {
    if (error instanceof ServerTimeoutError) {
      return i18n.t('common.error.network')
    } else if (error instanceof InternalServerError) {
      return i18n.t('common.error.internal')
    } else if (error instanceof BadRequestError) {
      return i18n.t('common.error.bad_request')
    } else if (error instanceof UnauthorizedError) {
      return i18n.t('common.error.unauthorized')
    } else if (error instanceof ForbiddenError) {
      return i18n.t('common.error.forbidden')
    } else if (error instanceof NotFoundError) {
      return i18n.t('common.error.not_found')
    } else if (error instanceof DepartmentNotFoundError) {
      return i18n.t('anonymousloginzipcode.invalid_code')
    } else {
      return i18n.t('common.error.generic')
    }
  },
}
