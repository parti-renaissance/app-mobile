import { format } from 'date-fns'
import { EventFilters } from '../../core/entities/Event'
import { SearchParamsKeyValue } from '../network/SearchParams'

type GetEventsSearchParametersMapperPropsBase = {
  page: number
  filters: EventFilters | undefined
  orderBySubscriptions?: boolean
  orderByBeginAt?: boolean
}

export type GetEventsSearchParametersMapperProps =
  | (GetEventsSearchParametersMapperPropsBase & {
      zipCode?: string | undefined
      zoneCode?: string | undefined
    })
  | ({
      zoneCode: string
      zipCode: undefined
    } & GetEventsSearchParametersMapperPropsBase)
  | ({
      zipCode: string
      zoneCode: undefined
    } & GetEventsSearchParametersMapperPropsBase)

export const GetEventsSearchParametersMapper = {
  map: ({ page, zipCode, zoneCode, filters, orderBySubscriptions, orderByBeginAt }: GetEventsSearchParametersMapperProps): SearchParamsKeyValue => {
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

    if (orderByBeginAt) {
      searchParams = {
        'order[beginAt]': 'desc',
        ...searchParams,
      }
    }
    return searchParams
  },
}
