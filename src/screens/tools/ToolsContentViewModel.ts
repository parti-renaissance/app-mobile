import PaginationInfo from '../../core/entities/PaginationInfo'
import { ToolRowViewModel } from './ToolRowViewModel'

export default interface ToolsContentViewModel {
  paginationInfo: PaginationInfo
  rows: Array<ToolRowViewModel>
}
