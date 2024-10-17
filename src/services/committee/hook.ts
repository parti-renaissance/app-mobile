import * as api from '@/services/committee/api'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

export const useGetCommittees = () => {
  return useSuspenseQuery({
    queryKey: ['committees'],
    queryFn: () => api.getCommittees(),
  })
}

export const useSetMyCommittee = () => {
  const queryClient = useQueryClient()
  const toast = useToastController()
  return useMutation({
    mutationKey: ['setMyCommittee'],
    mutationFn: (uuid: string) => api.setMyCommittee(uuid),
    onSuccess: () => {
      toast.show('Succès', { message: 'Comité mis à jour', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: ['profil', 'instances'],
      })
    },
    onError: (error, uuid) => {
      toast.show('Erreur', { message: 'Impossible de mettre à jour le profil', type: 'error' })
    },
  })
}
