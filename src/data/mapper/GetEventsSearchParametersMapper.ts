import { EventFilters } from '../../core/entities/Event'
import { SearchParamsKeyValue } from '../network/SearchParams'

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
      searchParams = {
        ...searchParams,
        'finishAt[strictly_after]': filters?.finishAfter,
      }
    }
    return searchParams
  },
}
