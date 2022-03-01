import PaginationInfo from './PaginationInfo'

export interface PaginatedResult<T> {
  paginationInfo: PaginationInfo
  result: T
}

export const PaginatedResult = {
  merge: <T>(
    previousContent: PaginatedResult<Array<T>>,
    newContent: PaginatedResult<Array<T>>,
  ): PaginatedResult<Array<T>> => {
    return {
      paginationInfo: newContent.paginationInfo,
      result: previousContent.result.concat(newContent.result),
    }
  },
}
