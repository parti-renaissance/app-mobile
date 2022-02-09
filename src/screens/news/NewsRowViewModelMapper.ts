import { News } from '../../core/entities/News'
import i18n from '../../utils/i18n'
import { NewsRowViewModel } from './NewsRowViewModel'
import { formatLocalizedDate } from '../../utils/DateFormatter'

export const NewsRowViewModelMapper = {
  map: (news: News): NewsRowViewModel => {
    return {
      id: news.id,
      title: news.title,
      date: i18n.t('home.news.date_format', {
        date: formatLocalizedDate(news.date, i18n.t('home.news.date_pattern')),
      }),
      isEnabled: news.url !== undefined,
    }
  },
}
