import * as api from '@/services/committee/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetCommittees = () => {
  return useSuspenseQuery({
    queryKey: ['committees'],
    queryFn: () => api.getCommittees(),
  })
}
