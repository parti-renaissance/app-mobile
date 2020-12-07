import ky from 'ky'
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ServerTimeoutError,
  UnauthorizedError,
} from '../../core/errors'

const genericErrorMapping = (error: Error) => {
  if (error instanceof ky.TimeoutError) {
    throw new ServerTimeoutError(error.message)
  } else if (error instanceof ky.HTTPError) {
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
