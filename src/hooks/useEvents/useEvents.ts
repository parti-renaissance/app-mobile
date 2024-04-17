import { EventFilters } from '@/core/entities/Event'
import { useSession } from '@/ctx/SessionProvider'
import ApiService from '@/data/network/ApiService'
import { Event, PublicSubscribtionFormData, RestShortEvent } from '@/data/restObjects/RestEvents'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { PaginatedFeedQueryKey } from '../useFeed'
import { optmisticToggleSubscribe, rollbackSubscribe } from './helpers'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

type FetchShortEventsOptions = {
  filters?: EventFilters
  postalCode?: string
  zoneCode?: string
}

const fetchEventList = async (pageParam: number, opts: FetchShortEventsOptions) =>
  await ApiService.getInstance().getEvents({ page: pageParam, zipCode: opts.postalCode, filters: opts.filters })

const fetchEventPublicList = async (pageParam: number, opts: FetchShortEventsOptions) => {
  return await ApiService.getInstance().getPublicEvents({ page: pageParam, filters: opts.filters, zoneCode: opts.zoneCode })
}

export const usePaginatedEvents = (opts: { filters?: EventFilters; postalCode?: string; zoneCode?: string }) => {
  const { session } = useSession()
  return useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS, session ? 'private' : 'public'],
    queryFn: ({ pageParam }) => (session ? fetchEventList(pageParam, opts) : fetchEventPublicList(pageParam, opts)),
    getNextPageParam: (lastPage) => (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : undefined),
    getPreviousPageParam: (firstPage) => firstPage.metadata.current_page - 1,
    initialPageParam: 1,
  })
}

export const useSubscribeEvent = ({ id: eventId }: { id: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => ApiService.getInstance().subscribeToEvent(eventId),
    onSuccess: () => {
      toast.show('Succès', { message: "Inscription à l'événement réussie", type: 'success' })
    },
    onMutate: () => optmisticToggleSubscribe(true, eventId, queryClient),
    onError: (error, _, previousData) => {
      if (previousData) rollbackSubscribe(previousData, queryClient)
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
    mutationFn: () => ApiService.getInstance().unsubscribeFromEvent(eventId),
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
    queryFn: () => (session ? ApiService.getInstance().getEventDetails(eventId) : ApiService.getInstance().getPublicEventDetails(eventId)),
  })
}

export const useSubscribePublicEvent = ({ id: eventId }: { id: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: PublicSubscribtionFormData) => ApiService.getInstance().subscribePublicEvent(eventId, payload),
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

export const useIsShortEvent = (event: Event): event is { isShort: true } & RestShortEvent => {
  return 'isShort' in event
}
