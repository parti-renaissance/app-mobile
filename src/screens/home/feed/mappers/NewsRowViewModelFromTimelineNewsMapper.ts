import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { DateFormatter } from '../../../../utils/DateFormatter'
import i18n from '../../../../utils/i18n'
import { NewsRowViewModel } from '../../../news/NewsRowViewModel'

export const NewsRowViewModelFromTimelineNewsMapper = {
  map: (item: TimelineFeedItem): NewsRowViewModel => {
    return {
      id: item.uuid,
      tag: item.isLocal
        ? i18n.t('news.tag.local')
        : i18n.t('news.tag.national'),
      title: item.title,
      author:
        item.author !== undefined
          ? i18n.t('news.author_format', {
              author: item.author,
            })
          : undefined,
      date: i18n.t('home.news.date_format', {
        date: DateFormatter.format(item.date, i18n.t('home.news.date_pattern')),
      }),
      isEnabled: true,
    }
  },
}
