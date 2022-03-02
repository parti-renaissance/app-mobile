import { News } from '../../core/entities/News'
import { DateFormatter } from '../../utils/DateFormatter'
import i18n from '../../utils/i18n'
import { NewsDetailViewModel } from './NewsDetailViewModel'

const mapCaption = (news: News): string => {
  const formattedDate = i18n.t('news.detail.caption_date_format', {
    date: DateFormatter.format(news.date, i18n.t('home.news.date_pattern')),
  })
  if (news.creator !== undefined) {
    const formattedAuthor = i18n.t('news.detail.caption_author_format', {
      author: news.creator,
    })
    return i18n.t('news.detail.caption_format', {
      author: formattedAuthor,
      date: formattedDate,
    })
  } else {
    return formattedDate
  }
}

export const NewsDetailViewModelMapper = {
  map: (news: News): NewsDetailViewModel => {
    return {
      title: news.title,
      caption: mapCaption(news),
      markdown: news.description,
    }
  },
}
