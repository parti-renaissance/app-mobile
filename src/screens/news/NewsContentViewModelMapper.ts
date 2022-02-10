import { News } from '../../core/entities/News'
import NewsContentViewModel from './NewsContentViewModel'
import { NewsRowViewModelMapper } from './NewsRowViewModelMapper'

export const NewsContentViewModelMapper = {
  map: (news: Array<News>): NewsContentViewModel => {
    return {
      rows: news.map(NewsRowViewModelMapper.map),
    }
  },
}
