import { News } from '../../core/entities/News'
import i18n from '../../utils/i18n'
import { NewsRowViewModel } from './NewsRowViewModel'
import { DateFormatter } from '../../utils/DateFormatter'

const mapTag = (visibility: News['visibility']) => {
  switch (visibility) {
    case 'local':
      return i18n.t('news.tag.local')
    case 'national':
      return i18n.t('news.tag.national')
  }
}

export const NewsRowViewModelMapper = {
  map: (news: News): NewsRowViewModel => {
    return {
      id: news.id,
      tag: mapTag(news.visibility),
      title: news.title,
      author:
        news.creator !== undefined
          ? i18n.t('news.author_format', {
              author: news.creator,
            })
          : undefined,
      date: i18n.t('home.news.date_format', {
        date: DateFormatter.format(news.date, i18n.t('home.news.date_pattern')),
      }),
      excerpt: news.description,
    }
  },
}
