import { EventFilters } from '../../core/entities/Event'
import { SearchParamsKeyValue } from '../network/SearchParams'
import { format } from 'date-fns'

export const GetEventsSearchParametersMapper = {
  map: (
    page: number,
    zipCode: string,
    filters: EventFilters | undefined,
    orderBySubscriptions: boolean | undefined,
  ): SearchParamsKeyValue => {
    let searchParams: SearchParamsKeyValue = { page }
    const subscribedOnly = filters?.subscribedOnly ? true : undefined
    if (subscribedOnly) {
      searchParams = {
        ...searchParams,
        subscribedOnly: true,
      }
    } else {
      // We limit the events to the department of the users
      searchParams = {
        ...searchParams,
        zipCode,
      }
    }
    if (filters?.finishAfter) {
      const formattedDate = format(filters.finishAfter, 'yyyy-MM-dd')
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
    if (orderBySubscriptions) {
      searchParams = {
        'order[subscriptions]': 'desc',
        ...searchParams,
      }
    }
    return searchParams
  },
}
