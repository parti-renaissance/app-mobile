import { News } from '../../core/entities/News'
import i18n from '../../utils/i18n'
import { NewsContentViewModel } from './NewsContentViewModel'
import { NewsRowViewModelMapper } from './NewsRowViewModelMapper'

export const NewsContentViewModelMapper = {
  map: (news: Array<News>): NewsContentViewModel => {
    return {
      sections: [
        {
          title: i18n.t('news.section.latest'),
          data: news.map(NewsRowViewModelMapper.map),
        },
      ],
    }
  },
}
