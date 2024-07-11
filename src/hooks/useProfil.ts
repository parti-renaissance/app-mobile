import { RemoveAccountInteractor } from '@/core/interactor/RemoveAccountInteractor'
import { useSession } from '@/ctx/SessionProvider'
import ApiService from '@/data/network/ApiService'
import { RestProfileResponse } from '@/data/restObjects/RestProfileResponse'
import { RestUpdateProfileRequest } from '@/data/restObjects/RestUpdateProfileRequest'
import { getDetailedProfile, getProfile, getUserScopes } from '@/services/profile/api'
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
    mutationFn: (data: RestUpdateProfileRequest) => ApiService.getInstance().updateProfile(userUuid, data),
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

// @TODO : remove key from queryClient when user delete his account
export const useDeleteProfil = () => {
  // const queryClient = useQueryClient()
  const toast = useToastController()
  const { signOut } = useSession()

  return useMutation({
    mutationFn: () => new RemoveAccountInteractor().execute(),
    onSuccess: () => {
      signOut()

      toast.show('Succès', { message: 'Compte supprimé avec succès', type: 'success' })
    },
    onError: (e) => {
      toast.show('Erreur', { message: 'Impossible de supprimer le profil', type: 'error' })
      return e
    },
  })
}
