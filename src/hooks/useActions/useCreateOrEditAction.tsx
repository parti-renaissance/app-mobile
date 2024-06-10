import ApiService from '@/data/network/ApiService'
import { ActionCreateType } from '@/data/restObjects/RestActions'
import { QUERY_KEY_PAGINATED_ACTIONS } from '@/hooks/useActions/useActions'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateOrEditAction = ({ uuid, scope }: { uuid?: string; scope?: string }) => {
  const client = useQueryClient()
  const toast = useToastController()
  const isEdit = !!uuid

  return useMutation({
    // Do not pass function prototype otherwise ApiService instance is not defined
    mutationFn: (p: ActionCreateType) => {
      if (!scope) {
        throw new Error('No scope found')
      }
      if (isEdit) {
        return ApiService.getInstance().editAction(uuid, p, scope)
      }
      return ApiService.getInstance().insertAction(p, scope)
    },
    onSuccess: async () => {
      const message = isEdit ? 'L’action a bien été modifiée' : 'L’action a bien été créée'
      toast.show('Succès', { message, type: 'success' })
      await client.invalidateQueries({
        queryKey: [QUERY_KEY_PAGINATED_ACTIONS],
      })
    },
    onError: () => {
      const message = isEdit ? 'Impossible de modifier l’action' : 'Impossible de créer l’action'
      toast.show('Erreur', { message, type: 'error' })
    },
  })
}
