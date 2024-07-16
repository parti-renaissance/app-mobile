import { ErrorThrower } from '@/services/errors/types'
import { parseError } from '@/services/errors/utils'
import { AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import { z } from 'zod'
import { ErrorMonitor } from './ErrorMonitor'

interface APICallPayload<Request, Response> {
  method: Method
  path: string
  requestSchema: z.ZodType<Request>
  responseSchema: z.ZodType<Response>
  errorThrowers?: ErrorThrower[]

  type?: 'private' | 'public'
}

export interface Instances {
  instance: AxiosInstance
  instanceWithoutInterceptors: AxiosInstance
}

export const createApi =
  ({ instance, instanceWithoutInterceptors }: Instances) =>
  <Request, Response>({ type = 'private', method, path, requestSchema, responseSchema, errorThrowers }: APICallPayload<Request, Response>) => {
    return async (requestData: Request) => {
      try {
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
      } catch (error) {
        parseError(error, errorThrowers)
      }
    }
  }
