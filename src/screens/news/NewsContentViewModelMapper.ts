import { News } from '../../core/entities/News'
import i18n from '../../utils/i18n'
import { NewsContentViewModel } from './NewsContentViewModel'
import { NewsRowViewModelMapper } from './NewsRowViewModelMapper'

export const NewsContentViewModelMapper = {
  map: (news: Array<News>): NewsContentViewModel => {
    return {
      sections: [
        // TODO: (Pierre Felgines) 2022/02/10 Get correct highlighted items
        {
          title: i18n.t('news.section.highlighted'),
          data: news.slice(0, 2).map(NewsRowViewModelMapper.map),
          isHighlighted: true,
        },
        {
          title: i18n.t('news.section.latest'),
          data: news.map(NewsRowViewModelMapper.map),
          isHighlighted: false,
        },
      ],
    }
  },
}
