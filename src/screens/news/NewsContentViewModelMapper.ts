import { News } from '../../core/entities/News'
import i18n from '../../utils/i18n'
import {
  NewsContentSectionViewModel,
  NewsContentViewModel,
} from './NewsContentViewModel'
import { NewsRowViewModelMapper } from './NewsRowViewModelMapper'

const MAX_HIGHLIGHTED_NEWS = 2

const splitNews = (
  news: News[],
): { highlightedNews: News[]; regularNews: News[] } => {
  const highlightedNews: News[] = []
  const regularNews: News[] = []

  news.forEach((current) => {
    if (current.isPinned && highlightedNews.length < MAX_HIGHLIGHTED_NEWS) {
      highlightedNews.push(current)
    } else {
      regularNews.push(current)
    }
  })

  return {
    highlightedNews,
    regularNews,
  }
}

export const NewsContentViewModelMapper = {
  map: (news: Array<News>): NewsContentViewModel => {
    const { regularNews, highlightedNews } = splitNews(news)

    const sections: Array<NewsContentSectionViewModel> = []
    if (highlightedNews.length > 0) {
      sections.push({
        title: i18n.t('news.section.highlighted'),
        data: highlightedNews.map(NewsRowViewModelMapper.map),
        isHighlighted: true,
      })
    }
    sections.push({
      title:
        highlightedNews.length > 0 ? i18n.t('news.section.latest') : undefined,
      data: regularNews.map(NewsRowViewModelMapper.map),
      isHighlighted: false,
    })
    return {
      sections,
    }
  },
}
