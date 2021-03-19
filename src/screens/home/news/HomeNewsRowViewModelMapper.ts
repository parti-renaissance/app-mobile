import { News } from '../../../core/entities/News'
import { format } from 'date-fns'
import { HomeNewsRowViewModel } from './HomeNewsRowViewModel'
import i18n from '../../../utils/i18n'

export const HomeNewsRowViewModelMapper = {
  map: (news: News): HomeNewsRowViewModel => {
    return {
      id: news.id,
      title: news.title,
      description: news.description,
      date: format(news.date, i18n.t('home.news.date_format')),
      url: news.url,
    }
  },
}
