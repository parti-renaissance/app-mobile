import { News } from '../../core/entities/News'
import { DateFormatter } from '../../utils/DateFormatter'
import i18n from '../../utils/i18n'
import { NewsDetailViewModel } from './NewsDetailViewModel'

export const NewsDetailViewModelMapper = {
  map: (news: News): NewsDetailViewModel => {
    return {
      title: news.title,
      caption: i18n.t('news.detail.caption_format', {
        author: '[TODO]',
        date: DateFormatter.format(news.date, i18n.t('home.news.date_pattern')),
      }),
      markdown: news.description,
    }
  },
}
