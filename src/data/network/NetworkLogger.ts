import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { HTTPError, TimeoutError } from 'ky'

export const logTypeError = (error: TypeError) => {
  ErrorMonitor.log('[NetworkLogger] Type error', {
    error: error.message,
  })
}

export const logTimeoutError = (error: TimeoutError) => {
  ErrorMonitor.log('[NetworkLogger] Timeout error', {
    request: {
      url: error.request.url,
      headers: JSON.stringify(error.request.headers),
      method: error.request.method,
    },
  })
}

export const logHttpError = async (error: HTTPError, title?: string) => {
  const body = await error.response.json()
  ErrorMonitor.log(
    title ?? `[NetworkLogger] HTTP error ${error.response.status}`,
    {
      request: {
        url: error.request.url,
        headers: JSON.stringify(error.request.headers),
        method: error.request.method,
      },
      response: {
        status: error.response.status,
        headers: JSON.stringify(error.response.headers),
        body: JSON.stringify(body),
      },
    },
    error.response.status !== 401,
  )
}

export const logDefaultError = (error: Error) => {
  ErrorMonitor.log('[NetworkLogger] Uncatched error', {
    error: error.message,
  })
}
