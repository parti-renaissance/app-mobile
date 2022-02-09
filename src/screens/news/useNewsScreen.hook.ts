import { useEffect, useState } from 'react'
import NewsRepository from '../../data/NewsRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { Analytics } from '../../utils/Analytics'
import { ExternalLink } from '../shared/ExternalLink'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import NewsContentViewModel from './NewsContentViewModel'
import { NewsContentViewModelMapper } from './NewsContentViewModelMapper'
import { NewsRowViewModel } from './NewsRowViewModel'

export const useNewsScreen = (): {
  statefulState: ViewState.Type<NewsContentViewModel>
  isLoadingMore: boolean
  isRefreshing: boolean
  loadFirstPage: () => void
  loadMore: () => void
  onNewsSelected: (viewModel: NewsRowViewModel) => void
} => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<NewsContentViewModel>
  >(new ViewState.Loading())
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
        const content = NewsContentViewModelMapper.map(paginatedResult)
        setStatefulState(new ViewState.Content(content))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(new ViewState.Loading())
            loadFirstPage()
          }),
        )
      })
      .finally(() => setRefreshing(false))
  }

  const loadMore = () => {
    const currentState = statefulState
    if (currentState instanceof ViewState.Content) {
      const content = currentState.content
      const paginationInfo = content.paginationInfo
      if (paginationInfo.currentPage === paginationInfo.lastPage) {
        // last page reached : nothing to paginate
        return
      }
      setLoadingMore(true)
      fetchNews(paginationInfo.currentPage + 1)
        .then((paginatedResult) => {
          const newContent = NewsContentViewModelMapper.map(
            paginatedResult,
            content,
          )
          setStatefulState(new ViewState.Content(newContent))
        })
        .catch((error) => {
          console.log(error)
          // no-op: next page can be reloaded by reaching the end of the list again
        })
        .finally(() => setLoadingMore(false))
    }
  }

  const onNewsSelected = (viewModel: NewsRowViewModel) => {
    if (viewModel.url !== undefined) {
      Analytics.logNewsOpen()
      ExternalLink.openUrl(viewModel.url)
    }
  }

  useEffect(loadFirstPage, [])

  return {
    statefulState,
    isLoadingMore,
    isRefreshing,
    loadFirstPage,
    loadMore,
    onNewsSelected,
  }
}
