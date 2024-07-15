import { instance, instanceWithoutInterceptors } from '@/lib/axios'
import { AxiosRequestConfig, Method } from 'axios'
import { z } from 'zod'
import { ErrorMonitor } from './ErrorMonitor'

interface APICallPayload<Request, Response> {
  method: Method
  path: string
  requestSchema: z.ZodType<Request>
  responseSchema: z.ZodType<Response>
  type?: 'private' | 'public'
}

export function api<Request, Response>({ type = 'private', method, path, requestSchema, responseSchema }: APICallPayload<Request, Response>) {
  return async (requestData: Request) => {
    // Validate request data
    requestSchema.parse(requestData)

    // Prepare API call
    let data: Request | null = null
    let params: Request | null = null

    if (requestData) {
      if (['get', 'delete'].includes(method.toLowerCase())) {
        params = requestData
      } else {
        data = requestData
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url: path,
      data,
      params,
    }

    // Make API call base on the type of request
    const response = type === 'private' ? await instance(config) : await instanceWithoutInterceptors(config)

    // Parse and validate response data
    const result = responseSchema.safeParse(response.data)

    if (!result.success) {
      ErrorMonitor.log(`🚨 Safe-Parsing Failed : `, {
        api: { path, method, data, params },
        zod: result.error.message,
      })
      return response.data as Response
    } else {
      return result.data
    }
  }
}
