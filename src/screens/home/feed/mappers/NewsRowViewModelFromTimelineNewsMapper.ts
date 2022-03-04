import { TimelineFeedItemNews } from '../../../../core/entities/TimelineFeedItem'
import { DateFormatter } from '../../../../utils/DateFormatter'
import i18n from '../../../../utils/i18n'
import { NewsRowViewModel } from '../../../news/NewsRowViewModel'

const mapAuthor = (item: TimelineFeedItemNews): string | undefined => {
  // We don't display the author if the news is national
  const author = item.isLocal ? item.author : undefined
  if (author === undefined) {
    return undefined
  }
  return i18n.t('news.author_format', { author })
}

export const NewsRowViewModelFromTimelineNewsMapper = {
  map: (item: TimelineFeedItemNews): NewsRowViewModel => {
    return {
      id: item.uuid,
      tag: item.isLocal
        ? i18n.t('news.tag.local')
        : i18n.t('news.tag.national'),
      title: item.title,
      author: mapAuthor(item),
      date: i18n.t('home.news.date_format', {
        date: DateFormatter.format(item.date, i18n.t('home.news.date_pattern')),
      }),
      excerpt: item.description,
    }
  },
}
