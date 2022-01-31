import PaginatedResult from '../../core/entities/PaginatedResult'
import { Tool } from '../../core/entities/Tool'
import { ToolRowViewModelMapper } from './ToolRowViewModelMapper'
import ToolsContentViewModel from './ToolsContentViewModel'

export const ToolsContentViewModelMapper = {
  map: (
    paginatedResult: PaginatedResult<Array<Tool>>,
    previousViewModel: ToolsContentViewModel | undefined = undefined,
  ): ToolsContentViewModel => {
    const viewModels = paginatedResult.result.map(ToolRowViewModelMapper.map)
    const previousRows = previousViewModel?.rows ?? []
    return {
      paginationInfo: paginatedResult.paginationInfo,
      rows: previousRows.concat(viewModels),
    }
  },
}
