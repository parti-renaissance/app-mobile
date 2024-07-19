import * as api from '@/services/actions/api'
import { ActionCreateType } from '@/services/actions/schema'
import { GenericResponseError } from '@/services/common/errors/generic-errors'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { optmisticUpdate } from './helpers'

export const useCreateOrEditAction = ({ uuid, scope }: { uuid?: string; scope?: string }) => {
  const client = useQueryClient()
  const toast = useToastController()
  const isEdit = !!uuid

  return useMutation({
    // Do not pass function prototype otherwise api instance is not defined
    mutationFn: (p: ActionCreateType) => {
      if (isEdit) {
        return api.editAction(uuid, p, scope)
      }
      return api.insertAction(p, scope)
    },
    onSuccess: async (data) => {
      const message = isEdit ? 'L’action a bien été modifiée' : 'L’action a bien été créée'
      toast.show('Succès', { message, type: 'success' })
      optmisticUpdate(() => data, data.uuid, client)
    },
    onError: (e) => {
      if (e instanceof GenericResponseError) {
        return toast.show('Erreur', { message: e.message, type: 'error' })
      } else {
        const message = isEdit ? 'Impossible de modifier l’action' : 'Impossible de créer l’action'
        toast.show('Erreur', { message, type: 'error' })
      }
    },
  })
}
