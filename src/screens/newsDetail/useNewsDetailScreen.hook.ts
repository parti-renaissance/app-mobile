import NewsRepository from '../../data/NewsRepository'
import { ExternalLink } from '../shared/ExternalLink'
import { ViewState } from '../shared/ViewState'
import { NewsDetailViewModel } from './NewsDetailViewModel'
import { NewsDetailViewModelMapper } from './NewsDetailViewModelMapper'
import { useStatefulQuery } from './useStatefulQuery.hook'

export const useNewsDetailScreen = (
  newsId: string,
): {
  statefulState: ViewState<NewsDetailViewModel>
  onLinkRedirect: () => void
} => {
  const { statefulState } = useStatefulQuery(['newsDetail', newsId], () =>
    NewsRepository.getInstance().getNewsDetail(newsId),
  )

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
