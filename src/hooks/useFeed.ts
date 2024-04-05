import ApiService from '@/data/network/ApiService'
import { RestTimelineFeedResponse } from '@/data/restObjects/RestTimelineFeedResponse'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const PaginatedFeedQueryKey = ['feed'] as const

const fetchTimelineFeed = async (pageParam: number, zipcode?: string) =>
  zipcode ? await ApiService.getInstance().getTimelineFeed(pageParam, zipcode) : (Promise.resolve(undefined) as Promise<RestTimelineFeedResponse | undefined>)

export const useGetPaginatedFeed = (postalCode?: string) =>
  useSuspenseInfiniteQuery({
    queryKey: PaginatedFeedQueryKey,
    queryFn: ({ pageParam }) => fetchTimelineFeed(pageParam, postalCode),
    getNextPageParam: (lastPage) => (lastPage.nbPages > lastPage.page ? lastPage.page + 1 : null),
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
    initialPageParam: 0,
  })
