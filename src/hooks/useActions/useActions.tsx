import ApiService from '@/data/network/ApiService'
import { Action, RestActionFull, RestActionRequestParams, RestActions } from '@/data/restObjects/RestActions'
import { useToastController } from '@tamagui/toast'
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PaginatedFeedQueryKey } from '../useFeed'

export const QUERY_KEY_PAGINATED_ACTIONS = 'QUERY_KEY_PAGINATED_ACTIONS'
export const QUERY_KEY_ACTIONS = 'QUERY_KEY_ACTIONS'

export const usePaginatedActions = (params: Omit<RestActionRequestParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_ACTIONS, params],
    queryFn: ({ pageParam }) => ApiService.getInstance().getActions({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : undefined),
    getPreviousPageParam: (firstPage) => (firstPage.metadata.current_page <= firstPage.metadata.last_page ? undefined : firstPage.metadata.current_page - 1),
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  })
}

export const useAction = (id?: string, paginatedParams?: Omit<RestActionRequestParams, 'page'>) => {
  const queryClient = useQueryClient()
  const previousData = queryClient.getQueryData<InfiniteData<RestActions>>([QUERY_KEY_PAGINATED_ACTIONS, paginatedParams])

  const placeholderData = id
    ? previousData?.pages.flatMap((page) => page.items).find((action) => action.uuid === id) ||
      queryClient.getQueryData<RestActionFull>([QUERY_KEY_ACTIONS, { id }])
    : undefined
  return useQuery<Action>({
    queryKey: [QUERY_KEY_ACTIONS, { id }],
    queryFn: () => ApiService.getInstance().getAction(id!),
    enabled: !!id,
    staleTime: 10_000,
    placeholderData,
  })
}

export const useSubscribeAction = (id?: string) => {
  const queryClient = useQueryClient()
  const toast = useToastController()
  return useMutation({
    mutationFn: () => (id ? ApiService.getInstance().subscribeToAction(id) : Promise.reject(new Error('No id provided'))),
    onMutate: () => {
      queryClient.setQueryData<RestActionFull | undefined>([QUERY_KEY_ACTIONS, { id }], (prev) => {
        return prev ? { ...prev, user_registered_at: new Date() } : undefined
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ACTIONS, { id }] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_ACTIONS] })
      queryClient.invalidateQueries({ queryKey: PaginatedFeedQueryKey })
    },
    onSuccess: () => {
      toast.show('Succès', { message: 'Inscription à l’action réussie', type: 'success' })
    },
    onError: () => {
      toast.show('Erreur', { message: 'Impossible de s’inscrire à l’action', type: 'error' })
    },
  })
}

export const useUnsubscribeAction = (id?: string) => {
  const queryClient = useQueryClient()
  const toast = useToastController()
  return useMutation({
    mutationFn: () => (id ? ApiService.getInstance().unsubscribeFromAction(id) : Promise.reject(new Error('No id provided'))),
    onMutate: () => {
      queryClient.setQueryData<RestActionFull | undefined>([QUERY_KEY_ACTIONS, { id }], (prev) => {
        return prev ? { ...prev, user_registered_at: null } : undefined
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ACTIONS, { id }] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_ACTIONS] })
      queryClient.invalidateQueries({ queryKey: PaginatedFeedQueryKey })
    },
    onSuccess: () => {
      toast.show('Succès', { message: 'Désinscription de l’action réussie', type: 'success' })
    },
    onError: () => {
      toast.show('Erreur', { message: 'Impossible de se désinscrire de l’action', type: 'error' })
    },
  })
}
