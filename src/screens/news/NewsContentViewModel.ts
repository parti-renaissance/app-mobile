import PaginationInfo from '../../core/entities/PaginationInfo'
import { NewsRowViewModel } from './NewsRowViewModel'

export default interface NewsContentViewModel {
  paginationInfo: PaginationInfo
  rows: Array<NewsRowViewModel>
}
