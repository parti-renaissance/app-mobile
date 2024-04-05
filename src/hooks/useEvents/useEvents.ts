import { EventFilters } from '@/core/entities/Event'
import ApiService from '@/data/network/ApiService'
import { RestDetailedEvent, RestEvents, RestShortEvent } from '@/data/restObjects/RestEvents'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQuery, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { PaginatedFeedQueryKey } from '../useFeed'
import { getCachedPaginatedShortEvents, getCachedSingleEvent, optmisticToggleSubscribe, rollbackSubscribe } from './helpers'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

type FetchShortEventsOptions = {
  filters?: EventFilters
  postalCode?: string
}

const fetchEventList = async (pageParam: number, opts: FetchShortEventsOptions) =>
  opts.postalCode
    ? await ApiService.getInstance().getEvents(opts.postalCode, pageParam, opts.filters)
    : (Promise.resolve(undefined) as Promise<RestEvents | undefined>)

export const usePaginatedEvents = (opts: { filters?: EventFilters; postalCode?: string }) => {
  return useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS],
    queryFn: ({ pageParam }) => fetchEventList(pageParam, opts),
    getNextPageParam: (lastPage) => (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : null),
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
      rollbackSubscribe(previousData, queryClient)
      toast.show('Erreur', { message: "Impossible de s'inscrire à cet événement", type: 'error' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS] })
      queryClient.invalidateQueries({ queryKey: ['event', eventId] })
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
      rollbackSubscribe(previousData, queryClient)
    },
  })
}

export type Event =
  | ({
      isShort: true
    } & RestShortEvent)
  | RestDetailedEvent

export const useGetEvent = ({ id: eventId }: { id: string }) => {
  const queryClient = useQueryClient()
  const dataList = getCachedPaginatedShortEvents(queryClient)
  const dataEvent = getCachedSingleEvent(eventId, queryClient)
  const placeholderData = (() => {
    if (dataEvent) return dataEvent
    if (dataList) {
      const event = dataList.pages.flatMap((page) => page.items).find((event) => event.uuid === eventId)
      return { isShort: true, ...event }
    }
    return undefined
  })()

  return useSuspenseQuery<Event>({
    queryKey: ['event', eventId],
    queryFn: () => ApiService.getInstance().getEventDetails(eventId),
    ...(placeholderData ? { placeholderData } : {}),
  })
}

export const useIsShortEvent = (event: Event): event is { isShort: true } & RestShortEvent => {
  return 'isShort' in event
}
