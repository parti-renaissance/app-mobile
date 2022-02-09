import { News } from '../../../core/entities/News'
import { HomeNewsRowViewModel } from './HomeNewsRowViewModel'
import i18n from '../../../utils/i18n'
import { formatLocalizedDate } from '../../../utils/DateFormatter'

export const HomeNewsRowViewModelMapper = {
  map: (news: News): HomeNewsRowViewModel => {
    return {
      id: news.id,
      title: news.title,
      description: news.description,
      date: i18n.t('home.news.date_format', {
        date: formatLocalizedDate(news.date, i18n.t('home.news.date_pattern')),
      }),
      url: news.url,
    }
  },
}
