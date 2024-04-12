import { EventFilters } from '@/core/entities/Event'
import { useSession } from '@/ctx/SessionProvider'
import ApiService from '@/data/network/ApiService'
import { Event, RestDetailedEvent, RestEvents, RestShortEvent } from '@/data/restObjects/RestEvents'
import { useToastController } from '@tamagui/toast'
import { useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { PaginatedFeedQueryKey } from '../useFeed'
import { getCachedPaginatedShortEvents, getCachedSingleEvent, optmisticToggleSubscribe, rollbackSubscribe } from './helpers'
import { QUERY_KEY_PAGINATED_SHORT_EVENTS, QUERY_KEY_SINGLE_EVENT } from './queryKeys'

type FetchShortEventsOptions = {
  filters?: EventFilters
  postalCode?: string
  zoneCode?: string
}

const fetchEventList = async (pageParam: number, opts: FetchShortEventsOptions) =>
  opts.postalCode
    ? await ApiService.getInstance()
        .getEvents({ page: pageParam, zipCode: opts.postalCode, filters: opts.filters })
        .then((res) => ({
          ...res,
          items: res.items.map((item) => ({ ...item, object_state: item.organizer ? 'full' : 'partial' })),
        }))
    : (Promise.resolve(undefined) as Promise<RestEvents | undefined>)

const fetchEventPublicList = async (pageParam: number, opts: FetchShortEventsOptions) => {
  return await ApiService.getInstance()
    .getPublicEvents({ page: pageParam, filters: opts.filters, zoneCode: opts.zoneCode })
    .then((res) => ({
      ...res,
      items: res.items.map((item) => ({ ...item, object_state: item.organizer ? 'full' : 'partial' })),
    }))
}

export const usePaginatedEvents = (opts: { filters?: EventFilters; postalCode?: string; zoneCode?: string }) => {
  const { session, isLoading } = useSession()
  return useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY_PAGINATED_SHORT_EVENTS, session ? 'private' : 'public'],
    queryFn: ({ pageParam }) => (session ? fetchEventList(pageParam, opts) : fetchEventPublicList(pageParam, opts)),
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
