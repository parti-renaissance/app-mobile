import { EventFilters } from '../../core/entities/Event'
import { SearchParamsKeyValue } from '../network/SearchParams'
import moment from 'moment'

export const GetEventsSearchParametersMapper = {
  map: (filters: EventFilters | undefined): SearchParamsKeyValue => {
    let searchParams: SearchParamsKeyValue = {}
    const subscribedOnly = filters?.subscribedOnly ? true : undefined
    if (subscribedOnly) {
      searchParams = {
        ...searchParams,
        subscribedOnly: true,
      }
    }
    if (filters?.finishAfter) {
      const formattedDate = moment(filters?.finishAfter).format('YYYY-MM-DD')
      searchParams = {
        ...searchParams,
        'finishAt[strictly_after]': formattedDate,
      }
    }
    const searchText = filters?.searchText
    if (searchText && searchText.length > 0) {
      searchParams = {
        ...searchParams,
        name: searchText,
      }
    }
    const eventMode = filters?.mode
    if (eventMode) {
      searchParams = {
        ...searchParams,
        mode: eventMode,
      }
    }
    return searchParams
  },
}
