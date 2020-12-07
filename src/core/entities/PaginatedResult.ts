import PaginationInfo from './PaginationInfo'

export default interface PaginatedResult<T> {
  paginationInfo: PaginationInfo
  result: T
}
