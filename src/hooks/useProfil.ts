import { RemoveAccountInteractor } from '@/core/interactor/RemoveAccountInteractor'
import { useSession } from '@/ctx/SessionProvider'
import { RestProfileResponse } from '@/data/restObjects/RestProfileResponse'
import { getDetailedProfile, getProfile, getUserScopes, updateProfile } from '@/services/profile/api'
import { RestUpdateProfileRequest } from '@/services/profile/schema'
import { useToastController } from '@tamagui/toast'
import { QueryKey, UndefinedInitialDataOptions, useMutation, useQuery, useQueryClient, UseQueryResult, useSuspenseQuery } from '@tanstack/react-query'

const key = 'profil'

export const useGetProfil = ({
  ...options
}: Partial<UndefinedInitialDataOptions<ReturnType<Awaited<typeof getProfile>>, Error, RestProfileResponse, QueryKey>>): UseQueryResult<RestProfileResponse> => {
  return useQuery({
    queryKey: [key],
    queryFn: () => getProfile(),
    ...options,
  })
}

export const useGetUserScopes = (
  options: Partial<UndefinedInitialDataOptions<ReturnType<Awaited<typeof getUserScopes>>, Error, ReturnType<Awaited<typeof getUserScopes>>, QueryKey>>,
) => {
  return useQuery({
    queryKey: ['userScopes'],
    queryFn: () => getUserScopes(),
    ...options,
  })
}

export const useGetDetailProfil = () => {
  return useSuspenseQuery({
    queryKey: ['profileDetail'],
    queryFn: () => getDetailedProfile(),
  })
}

export const useMutationUpdateProfil = ({ userUuid }: { userUuid: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RestUpdateProfileRequest) => updateProfile(userUuid, data),
    onMutate: (profil) => {
      queryClient.setQueryData([key], profil)
    },
    onSuccess: () => {
      toast.show('Succès', { message: 'Profil mis à jour', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: [key],
      })
    },
    onError: (error, profil) => {
      queryClient.setQueryData([key], profil)
      toast.show('Erreur', { message: 'Impossible de mettre à jour le profil', type: 'error' })
    },
  })
}

export const useDeleteProfil = () => {
  const queryClient = useQueryClient()
  const toast = useToastController()

  return useMutation({
    mutationFn: () => new RemoveAccountInteractor().execute(),
    onSuccess: () => {
      queryClient.clear()
      toast.show('Succès', { message: 'Compte supprimé avec succès', type: 'success' })
    },
    onError: (e) => {
      toast.show('Erreur', { message: 'Impossible de supprimer le profil', type: 'error' })
      return e
    },
  })
}
