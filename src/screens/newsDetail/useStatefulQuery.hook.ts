import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'

export const useStatefulQuery = <
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, Error, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, Error> & { statefulState: ViewState<TData> } => {
  const query = useQuery(queryKey, queryFn, options)
  const statefulStateFromQuery = (): ViewState<TData> => {
    switch (query.status) {
      case 'loading':
        return ViewState.Loading()
      case 'error':
        return ViewStateUtils.networkError(query.error, query.refetch)
      case 'success':
        return ViewState.Content(query.data)
    }
    return ViewState.Loading()
  }
  return {
    ...query,
    statefulState: statefulStateFromQuery(),
  }
}
