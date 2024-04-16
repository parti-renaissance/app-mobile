import ApiService from '@/data/network/ApiService'
import { RestTimelineFeedResponse } from '@/data/restObjects/RestTimelineFeedResponse'
import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'

const key = ['tools']

const fetchTools = async (page: number) => {
  return ApiService.getInstance().getTools(page)
}

export const useTools = () => {
  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchTools(pageParam),
    getNextPageParam: (lastPage) => lastPage.metadata.current_page + 1,
  })
}
