import * as api from '@/services/profile/api'
import { RestUpdateProfileRequest } from '@/services/profile/schema'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const key = 'profil'

export const useGetProfil = ({ enabled }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => api.getProfile(),
    enabled,
  })
}

export const useGetUserScopes = ({ enabled }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ['userScopes'],
    queryFn: () => api.getUserScopes(),
    enabled,
  })
}

export const useGetDetailProfil = () => {
  return useSuspenseQuery({
    queryKey: ['profileDetail'],
    queryFn: () => api.getDetailedProfile(),
  })
}

export const useMutationUpdateProfil = ({ userUuid }: { userUuid: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RestUpdateProfileRequest) => api.updateProfile(userUuid, data),
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
    mutationFn: () => api.removeProfile(),
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
