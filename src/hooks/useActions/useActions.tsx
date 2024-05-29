import ApiService from '@/data/network/ApiService'
import { RestActionRequestParams } from '@/data/restObjects/RestActions'
import { useInfiniteQuery } from '@tanstack/react-query'

const QUERY_KEY_PAGINATED_ACTIONS = 'QUERY_KEY_PAGINATED_ACTIONS'

export const useSuspensePaginatedActions = (params: Omit<RestActionRequestParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_ACTIONS, params],
    queryFn: ({ pageParam }) => ApiService.getInstance().getActions({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : undefined),
    getPreviousPageParam: (firstPage) => (firstPage.metadata.current_page <= firstPage.metadata.last_page ? undefined : firstPage.metadata.current_page - 1),
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  })
}
