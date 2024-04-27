import { isFullEvent, isPartialEvent, RestEvent, RestEvents } from '@/data/restObjects/RestEvents'
import { InfiniteData, QueryClient } from '@tanstack/react-query'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

type ShortEventUpdater = (oldShortEventData: RestEvent) => RestEvent
type OptimisticEventSetter = (params: { id: string; updater: ShortEventUpdater; queryClient: QueryClient }) => void

export const optmisticSetPaginatedShortEvent: OptimisticEventSetter = ({ id, queryClient, updater }) => {
  queryClient.setQueryData([QUERY_KEY_PAGINATED_SHORT_EVENTS], (oldPaginatedData: InfiniteData<RestEvents>) => {
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
  })
}

export const optmisticSetShortEventById: OptimisticEventSetter = ({ id, updater, queryClient }) => {
  queryClient.setQueryData([QUERY_KEY_SINGLE_EVENT, id], updater)
}

export const getCachedPaginatedShortEvents = (queryClient: QueryClient) => {
  return queryClient.getQueryData<InfiniteData<RestEvents>>([QUERY_KEY_PAGINATED_SHORT_EVENTS])
}

export const getCachedSingleEvent = (eventId: string, queryClient: QueryClient) => {
  return queryClient.getQueryData<RestEvent>([QUERY_KEY_SINGLE_EVENT, eventId])
}

export const getCachedPaginatedShortEvent = (eventId: string, queryClient: QueryClient) => {
  const paginatedEvents = getCachedPaginatedShortEvents(queryClient)
  if (!paginatedEvents) return undefined
  return paginatedEvents.pages.flatMap((page) => page.items).find((event) => event.uuid === eventId)
}

export const optmisticToggleSubscribe = async (subscribe: boolean, eventId: string, queryClient: QueryClient) => {
  const previousData = { shortEvents: getCachedPaginatedShortEvents(queryClient)!, event: getCachedSingleEvent(eventId, queryClient)! }

  const updateShortEvent = (oldShortEventData: RestEvent): RestEvent => {
    if (!oldShortEventData || isPartialEvent(oldShortEventData)) return oldShortEventData
    return { ...oldShortEventData, user_registered_at: subscribe ? new Date().toISOString() : null }
  }
  const optimisticParams = { id: eventId, updater: updateShortEvent, queryClient }
  optmisticSetPaginatedShortEvent(optimisticParams)
  optmisticSetShortEventById(optimisticParams)
  return previousData
}

export const rollbackSubscribe = (previousData: { shortEvents: InfiniteData<RestEvents>; event: RestEvent }, queryClient: QueryClient) => {
  queryClient.setQueryData([QUERY_KEY_PAGINATED_SHORT_EVENTS], previousData.shortEvents)
  queryClient.setQueryData([QUERY_KEY_SINGLE_EVENT, previousData.event.uuid], previousData.event)
}
