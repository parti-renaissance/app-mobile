import * as helpers from '@/services/common/helpers'
import { isPartialEvent, RestEvent } from '@/services/events/schema'
import { optmisticToggleSubscribe as toggleSubscribeOnfeed } from '@/services/timeline-feed/hook/helpers'
import { QueryClient } from '@tanstack/react-query'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

export const optmisticToggleSubscribe = async (subscribe: boolean, eventId: string, queryClient: QueryClient) => {
  const previousData = {
    shortEvents: helpers.getCachedPaginatedData<RestEvent>(queryClient, QUERY_KEY_PAGINATED_SHORT_EVENTS)!,
    event: helpers.getCachedSingleItem<RestEvent>(eventId, queryClient, QUERY_KEY_SINGLE_EVENT)!,
  }

  const updateShortEvent = (oldShortEventData: RestEvent): RestEvent => {
    if (!oldShortEventData || isPartialEvent(oldShortEventData)) return oldShortEventData
    return { ...oldShortEventData, user_registered_at: subscribe ? new Date().toISOString() : null }
  }
  const optimisticParams = { id: eventId, updater: updateShortEvent, queryClient }
  toggleSubscribeOnfeed(subscribe, eventId, queryClient)
  helpers.optmisticSetPaginatedData({ ...optimisticParams, queryKey: QUERY_KEY_PAGINATED_SHORT_EVENTS })
  helpers.optmisticSetDataById({ ...optimisticParams, queryKey: QUERY_KEY_SINGLE_EVENT })
  return previousData
}
