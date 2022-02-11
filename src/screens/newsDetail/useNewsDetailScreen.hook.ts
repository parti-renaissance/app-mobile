import { useEffect, useState } from 'react'
import { News } from '../../core/entities/News'
import NewsRepository from '../../data/NewsRepository'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { NewsDetailViewModel } from './NewsDetailViewModel'
import { NewsDetailViewModelMapper } from './NewsDetailViewModelMapper'

export const useNewsDetailScreen = (
  newsId: string,
): {
  statefulState: ViewState<NewsDetailViewModel>
} => {
  const [statefulState, setStatefulState] = useState<ViewState<News>>(
    ViewState.Loading(),
  )

  useEffect(() => {
    const fetchNews = () => {
      NewsRepository.getInstance()
        .getNewsDetail(newsId)
        .then((news) => setStatefulState(ViewState.Content(news)))
        .catch((error) => ViewStateUtils.networkError(error, fetchNews))
    }
    fetchNews()
  }, [newsId])

  return {
    statefulState: ViewState.map(statefulState, NewsDetailViewModelMapper.map),
  }
}
