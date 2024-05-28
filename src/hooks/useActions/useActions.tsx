import ApiService from '@/data/network/ApiService'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

const QUERY_KEY_PAGINATED_ACTIONS = 'QUERY_KEY_PAGINATED_ACTIONS'

type PaginatedActionsOptions = Omit<Parameters<typeof ApiService.prototype.getActions>[0], 'page'>

export const useSuspensePaginatedActions = (params: PaginatedActionsOptions) => {
  return useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_ACTIONS, params],
    queryFn: ({ pageParam }) => ApiService.getInstance().getActions({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : undefined),
    getPreviousPageParam: (firstPage) => firstPage.metadata.current_page - 1,
    initialPageParam: 1,
  })
}
