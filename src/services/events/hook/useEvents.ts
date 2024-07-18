import { EventFilters } from '@/core/entities/Event'
import { useSession } from '@/ctx/SessionProvider'
import * as api from '@/services/events/api'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { PaginatedFeedQueryKey } from '../../timeline-feed/hook/'
import { RestPostPublicEventSubsciptionRequest } from '../schema'
import { optmisticToggleSubscribe, rollbackSubscribe } from './helpers'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

type FetchShortEventsOptions = {
  filters?: EventFilters
  postalCode?: string
  zoneCode?: string
}

const fetchEventList = async (pageParam: number, opts: FetchShortEventsOptions) =>
  await api.getEvents({ page: pageParam, zipCode: opts.postalCode, filters: opts.filters, orderByBeginAt: true })

const fetchEventPublicList = async (pageParam: number, opts: FetchShortEventsOptions) => {
  return await api.getPublicEvents({ page: pageParam, filters: opts.filters, zoneCode: opts.zoneCode, orderByBeginAt: true })
}

export const useSuspensePaginatedEvents = (opts: { filters?: EventFilters; postalCode?: string; zoneCode?: string }) => {
  const { isAuth } = useSession()
  const filtersKey = opts.filters
    ? JSON.stringify({
        ...opts.filters,
        finishAfter: opts.filters.finishAfter ? format(opts.filters.finishAfter, 'yyyy-MM-dd') : '',
      })
    : ''

  return useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS, isAuth ? 'private' : 'public', filtersKey],
    queryFn: ({ pageParam }) => (isAuth ? fetchEventList(pageParam, opts) : fetchEventPublicList(pageParam, opts)),
    getNextPageParam: (lastPage) =>
      lastPage ? (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : null) : null,
    getPreviousPageParam: (firstPage) => (firstPage ? firstPage.metadata.current_page - 1 : null),
    initialPageParam: 1,
  })
}

export const useSubscribeEvent = ({ id: eventId }: { id: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.subscribeToEvent(eventId),
    onSuccess: () => {
      toast.show('Succès', { message: "Inscription à l'événement réussie", type: 'success' })
    },
    onMutate: () => optmisticToggleSubscribe(true, eventId, queryClient),
    onError: (error, _, previousData) => {
      // console.log(error.response.data)

      if (previousData) {
        rollbackSubscribe(previousData, queryClient)
      }
      toast.show('Erreur', { message: "Impossible de s'inscrire à cet événement", type: 'error' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SINGLE_EVENT, eventId] })
      queryClient.invalidateQueries({ queryKey: PaginatedFeedQueryKey })
    },
  })
}

export const useUnsubscribeEvent = ({ id: eventId }: { id: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.unsubscribeFromEvent(eventId),
    onSuccess: () => {
      toast.show('Succès', { message: "Désinscription de l'événement réussie", type: 'success' })
    },
    onMutate: () => optmisticToggleSubscribe(false, eventId, queryClient),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SINGLE_EVENT, eventId] })
      queryClient.invalidateQueries({ queryKey: PaginatedFeedQueryKey })
    },
    onError: (error, _, previousData) => {
      toast.show('Erreur', { message: 'Impossible de se désinscrire de cet événement', type: 'error' })
      if (previousData) rollbackSubscribe(previousData, queryClient)
    },
  })
}

export const useGetEvent = ({ id: eventId }: { id: string }) => {
  const { session } = useSession()
  return useSuspenseQuery({
    queryKey: [QUERY_KEY_SINGLE_EVENT, eventId],
    queryFn: () => (session ? api.getEventDetails(eventId) : api.getPublicEventDetails(eventId)),
  })
}

export const useSubscribePublicEvent = ({ id: eventId }: { id: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: RestPostPublicEventSubsciptionRequest) => api.subscribePublicEvent(eventId, payload),
    onSuccess: () => {
      toast.show('Succès', { message: "Inscription à l'événement réussie", type: 'success' })
    },
    onMutate: () => optmisticToggleSubscribe(true, eventId, queryClient),
    onError: (e) => {
      toast.show('Erreur', { message: "Impossible de s'inscrire à cet événement", type: 'error' })
      return e
    },
  })
}
