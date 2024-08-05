import { InfiniteData, QueryClient } from '@tanstack/react-query'
import { RestPagination } from './schema'

type OptimisticItemUpdater<Item extends { uuid: string }> = (oldShortEventData: Item) => Item
type OptimisticEventSetterProps<Item extends { uuid: string }> = {
  id: string
  updater: OptimisticItemUpdater<Item>
  queryClient: QueryClient
  queryKey: string
}

export const optimisticSetPaginatedData = <Item extends { uuid: string }>({ id, queryClient, updater, queryKey }: OptimisticEventSetterProps<Item>) => {
  queryClient.setQueriesData<InfiniteData<RestPagination<Item>>>(
    {
      queryKey: [queryKey],
    },
    (oldPaginatedData) => {
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
    },
  )
}

export const optimisticSetDataById = <Item extends { uuid: string }>({ id, updater, queryClient, queryKey }: OptimisticEventSetterProps<Item>) => {
  queryClient.setQueriesData<Item>(
    {
      queryKey: [queryKey, id],
    },
    (oldData) => {
      console.log('oldData', oldData)
      if (!oldData) return oldData
      return updater(oldData)
    },
  )
}

export const getCachedPaginatedData = <Item extends { uuid: string }>(queryClient: QueryClient, key: string) => {
  return queryClient.getQueriesData<InfiniteData<RestPagination<Item>>>({
    queryKey: [key],
  })
}

export const getCachedSingleItem = <Item extends { uuid: string }>(eventId: string, queryClient: QueryClient, queryKey: string) => {
  return queryClient.getQueryData<Item>([queryKey, eventId])
}

export const getCachedPaginatedItemList = <Item extends { uuid: string }>(eventId: string, queryClient: QueryClient, key: string) => {
  const paginatedEvents = getCachedPaginatedData<Item>(queryClient, key)
  if (!paginatedEvents) return undefined
  return paginatedEvents.map(([queryKeys, store]) => [queryKeys, store?.pages.flatMap((page) => page.items).find((event) => event.uuid === eventId)])
}
