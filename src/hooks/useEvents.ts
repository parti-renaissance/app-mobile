import ApiService from '@/data/network/ApiService';
import { RestDetailedEvent, RestEvents, RestShortEvent } from '@/data/restObjects/RestEvents';
import { useToastController } from '@tamagui/toast';
import { InfiniteData, useMutation, useQuery, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { PaginatedFeedQueryKey } from './useFeed'


const queryKey = ['shortEvents']

const fetchEventList = async (pageParam: number, zipcode?: string) =>
  zipcode ? await ApiService.getInstance().getEvents(zipcode, pageParam) : (Promise.resolve(undefined) as Promise<RestEvents | undefined>)

export const usePaginatedEvents = (postalCode: string) => {
  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchEventList(pageParam, postalCode),
    getNextPageParam: (lastPage) => (lastPage.metadata.last_page > lastPage.metadata.current_page ? lastPage.metadata.current_page + 1 : null),
    getPreviousPageParam: (firstPage) => firstPage.metadata.current_page - 1,
    initialPageParam: 1,
  })
}

export const useSubscribeEvent = (eventId: string) => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => ApiService.getInstance().subscribeToEvent(eventId),
    onSuccess: () => {
      console.log('success')
      toast.show('Succès', { message: 'Inscription à l\'événement réussie', type: 'success'})
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })
      const previousShortEvents = queryClient.getQueryData(queryKey)
      const previousEvent = queryClient.getQueryData(['event', eventId])
      queryClient.setQueryData(['event', eventId], (oldData: RestDetailedEvent | undefined) => {
        if (!oldData) return oldData
        return { ...oldData, user_registered_at: new Date().toISOString() }
      })
      queryClient.setQueryData(queryKey, (oldData: InfiniteData<RestEvents> | undefined) => {
        if (!oldData) return oldData
        const newPages = oldData.pages.map((page) => ({
          ...page,
          items: page.items.map((item) => {
            if (item.uuid === eventId) {
              return { ...item, user_registered_at: new Date().toISOString() }
            }
            return item
          }),
        }))
        return { ...oldData, pages: newPages }
      })
      return { previousShortEvents, previousEvent }
    },
    onError: (error, _, { previousShortEvents, previousEvent }) => {
      if (previousShortEvents) {
        queryClient.setQueryData(queryKey, previousShortEvents)
      }
      if (previousEvent) {
        queryClient.setQueryData(['event', eventId], previousEvent)
      }
      toast.show('Erreur', { message: 'Impossible de s\'inscrire à cet événement', type: 'error'})
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries({ queryKey: ['event', eventId] })
      queryClient.invalidateQueries({ queryKey: PaginatedFeedQueryKey })
    },
  })
}

export const useUnsubscribeEvent = (eventId: string) => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => ApiService.getInstance().unsubscribeFromEvent(eventId),
    onSuccess: () => {
      toast.show('Succès', { message: 'Désinscription de l\'événement réussie', type: 'success'})
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })
      const previousShortEvents = queryClient.getQueryData(queryKey)
      const previousEvent = queryClient.getQueryData(['event', eventId])
      queryClient.setQueryData(['event', eventId], (oldData: RestDetailedEvent | undefined) => {
        if (!oldData) return oldData
        return { ...oldData, user_registered_at: undefined }
      })
      queryClient.setQueryData(queryKey, (oldData: InfiniteData<RestEvents> | undefined) => {
        if (!oldData) return oldData
        const newPages = oldData.pages.map((page) => ({
          ...page,
          items: page.items.map((item) => {
            if (item.uuid === eventId) {
              return { ...item, user_registered_at: undefined }
            }
            return item
          }),
        }))
        return { ...oldData, pages: newPages }
      })
      return { previousShortEvents, previousEvent }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries({ queryKey: ['event', eventId] })
      queryClient.invalidateQueries({ queryKey: PaginatedFeedQueryKey })
    },
    onError: (error, _, { previousShortEvents, previousEvent }) => {
      toast.show('Erreur', { message: 'Impossible de se désinscrire de cet événement', type: 'error'})
      if (previousShortEvents) {
        queryClient.setQueryData(queryKey, previousShortEvents)
      }
      if (previousEvent) {
        queryClient.setQueryData(['event', eventId], previousEvent)
      }
    },
  })
}

export type Event =
  | ({
      isShort: true
    } & RestShortEvent)
  | RestDetailedEvent

export const useGetEvent = (eventId: string) => {
  const queryClient = useQueryClient()
  const dataList = queryClient.getQueryData<InfiniteData<RestEvents>>(queryKey)
  const dataEvent = queryClient.getQueryData<RestDetailedEvent>(['event', eventId])
  const placeholderData = (() => {

      if (dataEvent) {
        return dataEvent
      }
      if (dataList) {
        const event = dataList.pages.flatMap((page) => page.items).find((event) => event.uuid === eventId)
        return { isShort: true, ...event }
      }
      return undefined
    })()
  const useMyQuery = placeholderData ? useQuery : useSuspenseQuery
    
  return useMyQuery<Event>({
    queryKey: ['event', eventId],
    queryFn: () => ApiService.getInstance().getEventDetails(eventId),
    ...(placeholderData ? { placeholderData } : {})
  })
}

export const useIsShortEvent = (event: Event): event is { isShort: true } & RestShortEvent => {
  return 'isShort' in event
}
