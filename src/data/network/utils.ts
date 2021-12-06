import { HTTPError, TimeoutError } from 'ky'
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ServerTimeoutError,
  UnauthorizedError,
} from '../../core/errors'

const genericErrorMapping = (error: Error) => {
  if (
    error instanceof TypeError &&
    error.message === 'Network request failed'
  ) {
    throw new ServerTimeoutError(error.message)
  } else if (error instanceof TimeoutError) {
    throw new ServerTimeoutError(error.message)
  } else if (error instanceof HTTPError) {
    switch (error.response.status) {
      case 400:
        throw new BadRequestError(error.message)
      case 401:
        throw new UnauthorizedError(error.message)
      case 403:
        throw new ForbiddenError(error.message)
      case 404:
        throw new NotFoundError(error.message)
      case 500:
        throw new InternalServerError(error.message)
      default:
        throw error
    }
  } else {
    throw error
  }
}

export { genericErrorMapping }
