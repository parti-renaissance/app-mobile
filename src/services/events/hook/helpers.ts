import { isPartialEvent, RestEvent, RestGetEventsResponse, RestItemEvent } from '@/services/events/schema'
import { optmisticToggleSubscribe as toggleSubscribeOnfeed } from '@/services/timeline-feed/hook/helpers'
import { InfiniteData, QueryClient } from '@tanstack/react-query'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

type ShortEventUpdater = (oldShortEventData: RestEvent | RestItemEvent) => RestEvent
type OptimisticEventSetter = (params: { id: string; updater: ShortEventUpdater; queryClient: QueryClient }) => void

export const optmisticSetPaginatedShortEvent: OptimisticEventSetter = ({ id, queryClient, updater }) => {
  queryClient.setQueriesData<InfiniteData<RestGetEventsResponse>>(
    {
      queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS],
    },
    (oldPaginatedData) => {
      if (!oldPaginatedData) return oldPaginatedData
      const updatedPages = oldPaginatedData.pages.map((page) => {
        const updatedItems = page.items.map((item) => {
          if (item.uuid === id) {
            return updater(item)
          }
          return item
        })
        return { ...page, items: updatedItems }
      })
      return { ...oldPaginatedData, pages: updatedPages }
    },
  )
}

export const optmisticSetShortEventById: OptimisticEventSetter = ({ id, updater, queryClient }) => {
  queryClient.setQueryData([QUERY_KEY_SINGLE_EVENT, id], updater)
}

export const getCachedPaginatedShortEvents = (queryClient: QueryClient) => {
  return queryClient.getQueriesData<InfiniteData<RestGetEventsResponse>>({
    queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS],
  })
}

export const getCachedSingleEvent = (eventId: string, queryClient: QueryClient) => {
  return queryClient.getQueryData<RestEvent>([QUERY_KEY_SINGLE_EVENT, eventId])
}

export const getCachedPaginatedShortEvent = (eventId: string, queryClient: QueryClient) => {
  const paginatedEvents = getCachedPaginatedShortEvents(queryClient)
  if (!paginatedEvents) return undefined
  return paginatedEvents.map(([queryKeys, store]) => [queryKeys, store?.pages.flatMap((page) => page.items).find((event) => event.uuid === eventId)])
}

export const optmisticToggleSubscribe = async (subscribe: boolean, eventId: string, queryClient: QueryClient) => {
  const previousData = { shortEvents: getCachedPaginatedShortEvents(queryClient)!, event: getCachedSingleEvent(eventId, queryClient)! }

  const updateShortEvent = (oldShortEventData: RestEvent): RestEvent => {
    if (!oldShortEventData || isPartialEvent(oldShortEventData)) return oldShortEventData
    return { ...oldShortEventData, user_registered_at: subscribe ? new Date().toISOString() : null }
  }
  const optimisticParams = { id: eventId, updater: updateShortEvent, queryClient }
  toggleSubscribeOnfeed(subscribe, eventId, queryClient)
  optmisticSetPaginatedShortEvent(optimisticParams)
  optmisticSetShortEventById(optimisticParams)
  return previousData
}
