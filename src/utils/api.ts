import { instance, instanceWithoutInterceptors } from '@/lib/axios'
import { createApi } from './constructApi'

export const api = createApi({ instance, instanceWithoutInterceptors })
