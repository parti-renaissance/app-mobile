import { instance, instanceWithoutInterceptors } from '@/lib/axios'
import { AxiosRequestConfig, Method } from 'axios'
import { z } from 'zod'

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
    let url = path
    let data: Request | null = null

    if (requestData) {
      if (method === 'GET' || method === 'DELETE') {
        url += `${requestData}`
      } else {
        data = requestData
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
    }

    // Make API call base on the type of request
    const response = type === 'private' ? await instance(config) : await instanceWithoutInterceptors(config)

    // Parse and validate response data
    const result = responseSchema.safeParse(response.data)

    if (!result.success) {
      console.error(`🚨 Safe-Parsing Failed ${path}: `, result.error.message)
      throw new Error(result.error.message)
    } else {
      return result.data
    }
  }
}
