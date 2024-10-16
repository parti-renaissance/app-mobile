import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import * as api from './api'

export const useGetFormations = () => {
  return useSuspenseQuery({
    queryFn: () => api.getFormations(),
    queryKey: ['formations'],
  })
}

export const useGetFormationLink = (uuid: string) => {
  return useMutation({
    mutationFn: () => api.getFormationLink(uuid),
    mutationKey: ['formation-link', uuid],
  })
}
