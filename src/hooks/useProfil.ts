import ApiService from '@/data/network/ApiService'
import { useSuspenseQuery } from '@tanstack/react-query'

const key = ['profil']

export const useGetProfil = () => {
  return useSuspenseQuery({
    queryKey: key,
    queryFn: () => ApiService.getInstance().getProfile(),
  })
}
