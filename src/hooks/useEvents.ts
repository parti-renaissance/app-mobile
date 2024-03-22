import { DetailedEvent } from '@/core/entities/Event'
import { ForbiddenError } from '@/core/errors'
import ApiService from '@/data/network/ApiService'
import { RestDetailedEvent, RestEvents, RestShortEvent } from '@/data/restObjects/RestEvents'
import { AlertUtils } from '@/screens/shared/AlertUtils'
import i18n from '@/utils/i18n'
import { InfiniteData, QueryKey, useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'

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

export const useSubscribedEvents = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (eventId: string) => ApiService.getInstance().subscribeToEvent(eventId),
    onMutate: async (eventId) => {
      await queryClient.cancelQueries({ queryKey })
      const previousShortEvents = queryClient.getQueryData(queryKey)
      console.log('previousShortEvents', previousShortEvents)
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
      return { previousShortEvents }
    },
    onError: (error, _, { previousShortEvents }) => {
      if (previousShortEvents) {
        queryClient.setQueryData(queryKey, previousShortEvents)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export const useUnsubscribedEvents = () => {
  return useMutation({
    mutationFn: (eventId: string) => ApiService.getInstance().unsubscribeFromEvent(eventId),
    onError: (error) => {
      let message: string | undefined
      if (error instanceof ForbiddenError) {
        message = i18n.t('eventdetails.connect_to_subscribe')
      }
      AlertUtils.showNetworkAlert(error, () => {}, { message })
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
  return useSuspenseQuery<Event>({
    queryKey: ['event', eventId],
    queryFn: () => ApiService.getInstance().getEventDetails(eventId),
    initialData: () => {
      const dataList = queryClient.getQueryData<InfiniteData<RestEvents>>(queryKey)
      const dataEvent = queryClient.getQueryData<RestDetailedEvent>(['event', eventId])
      if (dataEvent) {
        return dataEvent
      }
      if (dataList) {
        const event = dataList.pages.flatMap((page) => page.items).find((event) => event.uuid === eventId)
        return { isShort: true, ...event }
      }
      return undefined
    },
  })
}

export const useIsShortEvent = (event: Event): event is { isShort: true } & RestShortEvent => {
  return 'isShort' in event
}
