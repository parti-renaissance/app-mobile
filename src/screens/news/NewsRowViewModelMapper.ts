import { News } from '../../core/entities/News'
import { format } from 'date-fns'
import i18n from '../../utils/i18n'
import { NewsRowViewModel } from './NewsRowViewModel'

export const NewsRowViewModelMapper = {
  map: (news: News): NewsRowViewModel => {
    return {
      id: news.id,
      title: news.title,
      date: format(news.date, i18n.t('home.news.date_format')),
      isEnabled: news.url !== undefined,
    }
  },
}
