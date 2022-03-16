import { useNavigation } from '@react-navigation/native'
import NewsRepository from '../../data/NewsRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { NewsNavigatorScreenProps } from '../../navigation/news/NewsNavigatorScreenProps'
import { ViewState } from '../shared/ViewState'
import { NewsContentViewModel } from './NewsContentViewModel'
import { NewsContentViewModelMapper } from './NewsContentViewModelMapper'
import { useInfiniteStatefulQuery } from './useInfiniteStatefulQuery.hook'

export const useNewsScreen = (): {
  statefulState: ViewState<NewsContentViewModel>
  isLoadingMore: boolean
  isRefreshing: boolean
  refetch: () => void
  loadMore: () => void
  onNewsSelected: (id: string) => void
} => {
  const navigation = useNavigation<
    NewsNavigatorScreenProps<'News'>['navigation']
  >()
  const fetchNews = async (page: number) => {
    const zipCode = await ProfileRepository.getInstance().getZipCode()
    return NewsRepository.getInstance().getNews(zipCode, page)
  }

  const {
    statefulState,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteStatefulQuery(
    'news',
    ({ pageParam = 1 }) => fetchNews(pageParam),
    {
      getNextPageParam: (lastPaginatedResult) => {
        const paginationInfo = lastPaginatedResult.paginationInfo
        return paginationInfo.currentPage < paginationInfo.lastPage
          ? paginationInfo.currentPage + 1
          : undefined
      },
    },
  )

  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return
    }
    fetchNextPage()
  }

  const onNewsSelected = (id: string) => {
    // TODO: (Pierre Felgines) 2022/02/11 Check where to log analytics `Analytics.logNewsOpen()`
    navigation.navigate('NewsDetailModal', {
      screen: 'NewsDetail',
      params: { newsId: id },
    })
  }

  return {
    statefulState: ViewState.map(statefulState, (result) => {
      return NewsContentViewModelMapper.map(result.result)
    }),
    isLoadingMore: isFetchingNextPage,
    isRefreshing: isFetching,
    refetch,
    loadMore,
    onNewsSelected,
  }
}
