import { News } from '../../core/entities/News'
import PaginatedResult from '../../core/entities/PaginatedResult'
import NewsContentViewModel from './NewsContentViewModel'
import { NewsRowViewModelMapper } from './NewsRowViewModelMapper'

export const NewsContentViewModelMapper = {
  map: (
    paginatedResult: PaginatedResult<Array<News>>,
    previousViewModel: NewsContentViewModel | undefined = undefined,
  ): NewsContentViewModel => {
    const viewModels = paginatedResult.result.map(NewsRowViewModelMapper.map)
    const previousRows = previousViewModel?.rows ?? []
    return {
      paginationInfo: paginatedResult.paginationInfo,
      rows: previousRows.concat(viewModels),
    }
  },
}
