import { useSession } from '@/ctx/SessionProvider'
import ApiService from '@/data/network/ApiService'
import { RestUpdateProfileRequest } from '@/data/restObjects/RestUpdateProfileRequest'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const key = 'profil'

export const useGetProfil = () => {
  return useSuspenseQuery({
    queryKey: [key],
    queryFn: () => ApiService.getInstance().getProfile(),
  })
}

export const useGetDetailProfil = () => {
  return useSuspenseQuery({
    queryKey: ['profileDetail'],
    queryFn: () => ApiService.getInstance().getDetailedProfile(),
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
    mutationFn: () => ApiService.getInstance().removeProfile(),
    onSuccess: () => {
      signOut()

      toast.show('Succès', { message: 'Compte supprimé avec succès', type: 'success' })
    },
    onError: () => {
      toast.show('Erreur', { message: 'Impossible de supprimer le profil', type: 'error' })
    },
  })
}
