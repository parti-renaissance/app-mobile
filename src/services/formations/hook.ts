import { useSuspenseQuery } from '@tanstack/react-query'
import * as api from './api'

export const useGetFormations = () => {
  return useSuspenseQuery({
    queryFn: () => api.getFormations(),
    queryKey: ['formations'],
  })
}
