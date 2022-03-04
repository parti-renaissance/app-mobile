import { useEffect, useState } from 'react'
import { News } from '../../core/entities/News'
import NewsRepository from '../../data/NewsRepository'
import { ExternalLink } from '../shared/ExternalLink'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { NewsDetailViewModel } from './NewsDetailViewModel'
import { NewsDetailViewModelMapper } from './NewsDetailViewModelMapper'

export const useNewsDetailScreen = (
  newsId: string,
): {
  statefulState: ViewState<NewsDetailViewModel>
  onLinkRedirect: () => void
} => {
  const [statefulState, setStatefulState] = useState<ViewState<News>>(
    ViewState.Loading(),
  )

  useEffect(() => {
    const fetchNews = () => {
      NewsRepository.getInstance()
        .getNewsDetail(newsId)
        .then((news) => setStatefulState(ViewState.Content(news)))
        .catch((error) =>
          setStatefulState(ViewStateUtils.networkError(error, fetchNews)),
        )
    }
    fetchNews()
  }, [newsId])

  const onLinkRedirect = () => {
    const news = ViewState.unwrap(statefulState)
    if (news?.url !== undefined) {
      ExternalLink.openUrl(news.url)
    }
  }

  return {
    statefulState: ViewState.map(statefulState, NewsDetailViewModelMapper.map),
    onLinkRedirect,
  }
}
