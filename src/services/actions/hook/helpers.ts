import { RestAction, RestActionFull } from '@/services/actions/schema'
import * as helpers from '@/services/common/helpers'
import { optimisticToggleSubscribe as toggleSubscribeOnfeed } from '@/services/timeline-feed/hook/helpers'
import { QueryClient } from '@tanstack/react-query'
import { QUERY_KEY_ACTIONS, QUERY_KEY_PAGINATED_ACTIONS } from './useActions'

export const optimisticToggleSubscribe = async (subscribe: boolean, actionId: string, queryClient: QueryClient) => {
  const updateAction: helpers.OptimisticItemUpdater<RestAction> = (oldShortEventData) => {
    if (!oldShortEventData) return undefined
    return { ...oldShortEventData, user_registered_at: subscribe ? new Date() : null }
  }

  const optimisticParams = { id: actionId, updater: updateAction, queryClient }
  toggleSubscribeOnfeed(subscribe, actionId, queryClient)
  helpers.optimisticSetPaginatedData({ ...optimisticParams, queryKey: QUERY_KEY_PAGINATED_ACTIONS })
  helpers.optimisticSetDataById({ ...optimisticParams, queryKey: QUERY_KEY_ACTIONS })
}

export const optimisticUpdate = async (updater: helpers.OptimisticItemUpdater<RestActionFull>, actionId: string, queryClient: QueryClient) => {
  const optimisticParams = { id: actionId, updater, queryClient }
  helpers.optimisticSetPaginatedData({ ...optimisticParams, queryKey: QUERY_KEY_PAGINATED_ACTIONS })
  helpers.optimisticSetDataById({ ...optimisticParams, queryKey: QUERY_KEY_ACTIONS })
}
