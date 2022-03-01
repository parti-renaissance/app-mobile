import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { News } from '../../core/entities/News'
import { PaginatedResult } from '../../core/entities/PaginatedResult'
import NewsRepository from '../../data/NewsRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { NewsNavigatorScreenProps } from '../../navigation/NewsNavigator'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { NewsContentViewModel } from './NewsContentViewModel'
import { NewsContentViewModelMapper } from './NewsContentViewModelMapper'

export const useNewsScreen = (): {
  statefulState: ViewState<NewsContentViewModel>
  isLoadingMore: boolean
  isRefreshing: boolean
  loadFirstPage: () => void
  loadMore: () => void
  onNewsSelected: (id: string) => void
} => {
  const navigation = useNavigation<
    NewsNavigatorScreenProps<'News'>['navigation']
  >()
  const [statefulState, setStatefulState] = useState<
    ViewState<PaginatedResult<Array<News>>>
  >(ViewState.Loading())
  const [isRefreshing, setRefreshing] = useState(true)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const fetchNews = async (page: number) => {
    const zipCode = await ProfileRepository.getInstance().getZipCode()
    return NewsRepository.getInstance().getNews(zipCode, page)
  }

  const loadFirstPage = () => {
    setRefreshing(true)
    fetchNews(1)
      .then((paginatedResult) => {
        setStatefulState(ViewState.Content(paginatedResult))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(ViewState.Loading())
            loadFirstPage()
          }),
        )
      })
      .finally(() => setRefreshing(false))
  }

  const loadMore = () => {
    const currentResult = ViewState.unwrap(statefulState)
    if (currentResult === undefined) {
      return
    }

    const paginationInfo = currentResult.paginationInfo
    if (paginationInfo.currentPage === paginationInfo.lastPage) {
      // last page reached : nothing to paginate
      return
    }
    setLoadingMore(true)
    fetchNews(paginationInfo.currentPage + 1)
      .then((paginatedResult) => {
        const newContent = PaginatedResult.merge(currentResult, paginatedResult)
        setStatefulState(ViewState.Content(newContent))
      })
      .catch((error) => {
        console.log(error)
        // no-op: next page can be reloaded by reaching the end of the list again
      })
      .finally(() => setLoadingMore(false))
  }

  const onNewsSelected = (id: string) => {
    // TODO: (Pierre Felgines) 2022/02/11 Check where to log analytics `Analytics.logNewsOpen()`
    navigation.navigate('NewsDetailModal', {
      screen: 'NewsDetail',
      params: { newsId: id },
    })
  }

  useEffect(loadFirstPage, [])

  return {
    statefulState: ViewState.map(statefulState, (result) => {
      return NewsContentViewModelMapper.map(result.result)
    }),
    isLoadingMore,
    isRefreshing,
    loadFirstPage,
    loadMore,
    onNewsSelected,
  }
}
