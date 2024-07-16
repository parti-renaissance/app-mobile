import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, ServerTimeoutError, UnauthorizedError } from '@/core/errors'
import { logDefaultError, logHttpError, logTimeoutError, logTypeError } from '@/data/network/NetworkLogger'
import axios from 'axios'

export const genericErrorThrower = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      logTimeoutError(error)
      throw new ServerTimeoutError(error.message)
    } else if (error.response) {
      logHttpError(error)
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
      logDefaultError(error)
      throw error
    }
  } else if (error instanceof TypeError && error.message === 'Network request failed') {
    logTypeError(error)
    throw new ServerTimeoutError(error.message)
  } else if (error instanceof Error) {
    logDefaultError(error)
  }
  return error
}
