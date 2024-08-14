import { useSession } from '@/ctx/SessionProvider'
import { SelectType } from '@/screens/actions'
import * as api from '@/services/actions/api'
import { Action, RestActionFull, RestActionRequestParams, RestActions, SelectPeriod } from '@/services/actions/schema'
import { GenericResponseError } from '@/services/common/errors/generic-errors'
import { useToastController } from '@tamagui/toast'
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { optimisticToggleSubscribe } from './helpers'

export const QUERY_KEY_PAGINATED_ACTIONS = 'QUERY_KEY_PAGINATED_ACTIONS'
export const QUERY_KEY_ACTIONS = 'QUERY_KEY_ACTIONS'

type Params = Omit<RestActionRequestParams, 'page'> & {
  filters: {
    type: SelectType
    period: SelectPeriod
  }
}

export const usePaginatedActions = (params: Params) => {
  const { filters, ...rest } = params
  return useInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_ACTIONS, JSON.stringify(params)],
    queryFn: ({ pageParam }) => api.getActions({ ...rest, page: pageParam, type: filters.type, period: filters.period }),
    getNextPageParam: (lastPage) => (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : undefined),
    getPreviousPageParam: (firstPage) => (firstPage.metadata.current_page <= firstPage.metadata.last_page ? undefined : firstPage.metadata.current_page - 1),
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  })
}

export const useAction = (id?: string, paginatedParams?: Params) => {
  const queryClient = useQueryClient()
  const previousData = queryClient.getQueryData<InfiniteData<RestActions>>([QUERY_KEY_PAGINATED_ACTIONS, JSON.stringify(paginatedParams)])
  const { scope } = useSession()
  const myScope = scope?.data?.find((x) => x.features.includes('actions'))

  const placeholderData = id
    ? previousData?.pages.flatMap((page) => page.items).find((action) => action.uuid === id) ||
      queryClient.getQueryData<RestActionFull>([QUERY_KEY_ACTIONS, id])
    : undefined
  return useQuery<Action>({
    queryKey: [QUERY_KEY_ACTIONS, id, myScope?.code],
    queryFn: () => api.getAction(id!, myScope?.code),
    enabled: !!id,
    staleTime: 10_000,
    placeholderData,
  })
}

export const useSubscribeAction = (id?: string) => {
  const queryClient = useQueryClient()
  const toast = useToastController()
  const { user } = useSession()
  if (!user.data) {
    throw new Error("L'utilisateur est introuvable")
  }
  return useMutation({
    mutationFn: () => (id ? api.subscribeToAction(id) : Promise.reject(new Error('No id provided'))),
    onSuccess: () => {
      if (id !== undefined) {
        optimisticToggleSubscribe(user.data)(true, id, queryClient)
      }
      toast.show('Succès', { message: 'Inscription à l’action réussie', type: 'success' })
    },
    onError: (e) => {
      if (e instanceof GenericResponseError) {
        toast.show('Erreur', { message: e.message, type: 'error' })
      } else {
        toast.show('Erreur', { message: 'Impossible de s’inscrire à l’action', type: 'error' })
      }
    },
  })
}

export const useUnsubscribeAction = (id?: string) => {
  const queryClient = useQueryClient()
  const toast = useToastController()
  const { user } = useSession()
  if (!user.data) {
    throw new Error("L'utilisateur est introuvable")
  }
  return useMutation({
    mutationFn: () => (id ? api.unsubscribeFromAction(id) : Promise.reject(new Error('No id provided'))),
    onSuccess: () => {
      if (id) {
        optimisticToggleSubscribe(user.data)(false, id!, queryClient)
      }
      toast.show('Succès', { message: 'Désinscription de l’action réussie', type: 'success' })
    },
    onError: (e) => {
      if (e instanceof GenericResponseError) {
        toast.show('Erreur', { message: e.message, type: 'error' })
      } else {
        toast.show('Erreur', { message: 'Impossible de se désinscrire de l’action', type: 'error' })
      }
    },
  })
}
