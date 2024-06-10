import { useSession } from '@/ctx/SessionProvider'
import ApiService from '@/data/network/ApiService'
import { ActionCreateType } from '@/data/restObjects/RestActions'
import { QUERY_KEY_PAGINATED_ACTIONS } from '@/hooks/useActions/useActions'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateOrEditAction({ uuid }: { uuid?: string }) {
  const client = useQueryClient()
  const toast = useToastController()
  const { scope } = useSession()
  const myScope = scope?.data?.find((x) => x.features.includes('actions'))
  const isEdit = !!uuid

  return useMutation({
    // Do not pass function prototype otherwise ApiService instance is not defined
    mutationFn: (p: ActionCreateType) => {
      if (!myScope) {
        throw new Error('No scope found')
      }
      if (isEdit) {
        return ApiService.getInstance().editAction(uuid, p, myScope.code)
      }
      return ApiService.getInstance().insertAction(p, myScope.code)
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
