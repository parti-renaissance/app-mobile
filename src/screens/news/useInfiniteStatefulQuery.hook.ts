import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query'
import { PaginatedResult } from '../../core/entities/PaginatedResult'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'

export const useInfiniteStatefulQuery = <
  TEntity = unknown,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<PaginatedResult<Array<TEntity>>, TQueryKey>,
  options?: Omit<
    UseInfiniteQueryOptions<
      PaginatedResult<Array<TEntity>>,
      Error,
      PaginatedResult<Array<TEntity>>,
      PaginatedResult<Array<TEntity>>,
      TQueryKey
    >,
    'queryKey' | 'queryFn'
  >,
): UseInfiniteQueryResult<PaginatedResult<Array<TEntity>>, Error> & {
  statefulState: ViewState<PaginatedResult<Array<TEntity>>>
} => {
  const query = useInfiniteQuery(queryKey, queryFn, options)
  const statefulStateFromQuery = (): ViewState<
    PaginatedResult<Array<TEntity>>
  > => {
    switch (query.status) {
      case 'loading':
        return ViewState.Loading()
      case 'error':
        return ViewStateUtils.networkError(query.error, query.refetch)
      case 'success':
        return ViewState.Content(
          query.data.pages.reduce((previous, current) => {
            return PaginatedResult.merge(previous, current)
          }),
        )
    }
    return ViewState.Loading()
  }
  return {
    ...query,
    statefulState: statefulStateFromQuery(),
  }
}
