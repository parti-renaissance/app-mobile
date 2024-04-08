import { useEffect, useState } from 'react'
import ApiService from '@/data/network/ApiService'
import { RestProfileResponse } from '@/data/restObjects/RestProfileResponse'
import { QueryObserver, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const key = ['profil']

const useGetProfil = () => {
  return useSuspenseQuery({
    queryKey: key,
    queryFn: () => ApiService.getInstance().getProfile(),
  })
}

export const useGetProfilObserver = () => {
  const getProfil = useGetProfil()
  const queryClient = useQueryClient()
  const [profil, setProfil] = useState<RestProfileResponse>(() => {
    const data = queryClient.getQueryData<RestProfileResponse>(key)
    return data ? data : ({} as RestProfileResponse)
  })

  useEffect(() => {
    const observer = new QueryObserver<RestProfileResponse>(queryClient, { queryKey: [key] })

    const unsubscribe = observer.subscribe((result) => {
      if (result.data) setProfil(result.data)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return {
    ...getProfil,
    profil,
  }
}
