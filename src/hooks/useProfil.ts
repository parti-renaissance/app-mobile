import { useEffect, useState } from 'react'
import ApiService from '@/data/network/ApiService'
import { RestProfileResponse } from '@/data/restObjects/RestProfileResponse'
import { QueryObserver, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const key = ['profil']

export const useGetProfil = () => {
  return useSuspenseQuery({
    queryKey: key,
    queryFn: () => ApiService.getInstance().getProfile(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })
}
