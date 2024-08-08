import * as helpers from '@/services/common/helpers'
import { isPartialEvent, RestEvent } from '@/services/events/schema'
import { optimisticToggleSubscribe as toggleSubscribeOnfeed } from '@/services/timeline-feed/hook/helpers'
import { QueryClient } from '@tanstack/react-query'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

export const optimisticToggleSubscribe = async (subscribe: boolean, eventId: string, queryClient: QueryClient) => {
  const previousData = {
    shortEvents: helpers.getCachedPaginatedData<RestEvent>(queryClient, QUERY_KEY_PAGINATED_SHORT_EVENTS)!,
    event: helpers.getCachedSingleItem<RestEvent>(eventId, queryClient, QUERY_KEY_SINGLE_EVENT)!,
  }

  const updateShortEvent: helpers.OptimisticItemUpdater<RestEvent> = (oldShortEventData) => {
    if (oldShortEventData === undefined) return undefined
    if (isPartialEvent(oldShortEventData)) return oldShortEventData
    return {
      ...oldShortEventData,
      user_registered_at: subscribe ? new Date().toISOString() : null,
      participants_count: subscribe ? (oldShortEventData.participants_count ?? 0) + 1 : (oldShortEventData.participants_count ?? 1) - 1,
    }
  }
  const optimisticParams = { id: eventId, updater: updateShortEvent, queryClient }
  toggleSubscribeOnfeed(subscribe, eventId, queryClient)
  helpers.optimisticSetPaginatedData({ ...optimisticParams, queryKey: QUERY_KEY_PAGINATED_SHORT_EVENTS })
  helpers.optimisticSetDataById({ ...optimisticParams, queryKey: QUERY_KEY_SINGLE_EVENT })
  return previousData
}
