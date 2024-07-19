import { RestTimelineFeedResponse } from '@/data/restObjects/RestTimelineFeedResponse'
import { getTimelineFeed } from '@/services/timeline-feed/api'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const PAGINATED_QUERY_FEED = 'feed' as const

const fetchTimelineFeed = async (pageParam: number, zipcode?: string) =>
    zipcode ? await getTimelineFeed({ page: pageParam, postal_code: zipcode }) : (Promise.resolve(undefined) as Promise<RestTimelineFeedResponse | undefined>)

export const useGetPaginatedFeed = (postalCode?: string) => {
    return useSuspenseInfiniteQuery({
        queryKey: [PAGINATED_QUERY_FEED, postalCode],
        queryFn: ({ pageParam }) => fetchTimelineFeed(pageParam, postalCode),
        getNextPageParam: (lastPage) => (lastPage ? (lastPage.nbPages > lastPage.page ? lastPage.page + 1 : null) : null),
        getPreviousPageParam: (firstPage) => (firstPage ? firstPage.page - 1 : null),
        initialPageParam: 0,
    })
}
