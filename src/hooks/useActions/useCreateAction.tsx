import ApiService from '@/data/network/ApiService'
import { ActionCreateType } from '@/data/restObjects/RestActions'
import { QUERY_KEY_PAGINATED_ACTIONS } from '@/hooks/useActions/useActions'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateAction() {
  const client = useQueryClient()
  const toast = useToastController()

  return useMutation({
    // Do not pass function prototype otherwise ApiService instance is not defined
    mutationFn: (p: ActionCreateType) => ApiService.getInstance().insertAction(p),
    onSuccess: async () => {
      toast.show('Succès', { message: 'L’action a bien été créée', type: 'success' })
      await client.invalidateQueries({
        queryKey: [QUERY_KEY_PAGINATED_ACTIONS],
      })
    },
    onError: () => {
      toast.show('Erreur', { message: 'Impossible de créer l’action', type: 'error' })
    },
  })
}
