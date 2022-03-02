import { useCallback, useState } from 'react'
import { EventFilters, EventMode, ShortEvent } from '../../core/entities/Event'
import { PaginatedResult } from '../../core/entities/PaginatedResult'
import { GetEventsInteractor } from '../../core/interactor/GetEventsInteractor'
import { GetMainEventsInteractor } from '../../core/interactor/GetMainEventsInteractor'
import { DateProvider } from '../../utils/DateProvider'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { EventFilter } from './EventListScreen'
import { EventSectionViewModelMapper } from './EventSectionViewModelMapper'
import { EventSectionViewModel } from './EventViewModel'

export const useEventListScreen = (
  eventFilter: EventFilter,
  searchText?: string,
  eventModeFilter?: EventMode,
): {
  statefulState: ViewState<Array<EventSectionViewModel>>
  isLoadingMore: boolean
  isRefreshing: boolean
  onRefresh: () => void
  onEndReached: (() => void) | undefined
} => {
  const [isRefreshing, setRefreshing] = useState(true)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const [statefulState, setStatefulState] = useState<
    ViewState<PaginatedResult<Array<ShortEvent>>>
  >(ViewState.Loading())

  const fetchEvents = useCallback(
    (page: number) => {
      const subscribedOnly = eventFilter === 'myEvents' ? true : false
      const filters: EventFilters = {
        subscribedOnly: subscribedOnly,
        finishAfter: DateProvider.now(),
        searchText: searchText,
        mode: eventModeFilter,
      }
      if (eventFilter === 'home') {
        return new GetMainEventsInteractor().execute(filters)
      } else {
        return new GetEventsInteractor().execute(page, filters)
      }
    },
    [eventFilter, searchText, eventModeFilter],
  )

  const loadFirstPage = useCallback(() => {
    if (statefulState.state === 'content') {
      setRefreshing(true)
    } else {
      setStatefulState(ViewState.Loading())
    }
    fetchEvents(1)
      .then((paginatedResult) => {
        setStatefulState(ViewState.Content(paginatedResult))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, loadFirstPage))
      })
      .finally(() => setRefreshing(false))
  }, [fetchEvents, statefulState])

  const onRefresh = useCallback(() => {
    loadFirstPage()
  }, [loadFirstPage])

  const onLoadMore = useCallback(() => {
    const currentState = statefulState
    if (currentState.state === 'content') {
      const content = currentState.content
      const paginationInfo = content.paginationInfo

      if (paginationInfo.currentPage === paginationInfo.lastPage) {
        // last page reached : nothing to paginate
        return
      }
      setLoadingMore(true)
      fetchEvents(paginationInfo.currentPage + 1)
        .then((paginatedResult) => {
          const newContent = PaginatedResult.merge(content, paginatedResult)
          setStatefulState(ViewState.Content(newContent))
        })
        .catch((error) => {
          console.log(error)
          // no-op: next page can be reloaded by reaching the end of the list again
        })
        .finally(() => setLoadingMore(false))
    }
  }, [statefulState, fetchEvents])

  // There is no pagination for the main home
  const onEndReached = eventFilter === 'home' ? undefined : onLoadMore

  return {
    statefulState: ViewState.map(statefulState, (result) => {
      return EventSectionViewModelMapper.map(result.result, eventFilter)
    }),
    isLoadingMore,
    isRefreshing,
    onRefresh,
    onEndReached,
  }
}
