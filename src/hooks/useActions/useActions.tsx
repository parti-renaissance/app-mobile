import ApiService from '@/data/network/ApiService'
import { Action, RestActionRequestParams, RestActions } from '@/data/restObjects/RestActions'
import { InfiniteData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

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
  const placeholderData = previousData?.pages.flatMap((page) => page.items).find((action) => action.uuid === id)
  return useQuery<Action>({
    queryKey: [QUERY_KEY_ACTIONS, { id }],
    queryFn: () => ApiService.getInstance().getAction(id!),
    enabled: !!id,
    placeholderData,
  })
}
