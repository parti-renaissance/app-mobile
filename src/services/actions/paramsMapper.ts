import { addDays, endOfDay, startOfDay } from 'date-fns'
import * as schema from './schema'

const calcPeriod = (period?: schema.SelectPeriod) => {
  switch (period) {
    case 'today':
      return {
        after: startOfDay(new Date()).toISOString(),
        before: endOfDay(new Date()).toISOString(),
      }
    case 'tomorow':
      return {
        after: startOfDay(addDays(new Date(), 1)).toISOString(),
        before: endOfDay(addDays(new Date(), 1)).toISOString(),
      }
    case 'week':
      return {
        after: startOfDay(new Date()).toISOString(),
        before: endOfDay(addDays(new Date(), 7)).toISOString(),
      }
    default:
      return null
  }
}

export const mapParams = ({ subscribeOnly, longitude, latitude, type, period }: schema.RestActionRequestParams) => {
  const periodDate = calcPeriod(period as schema.SelectPeriod)

  return {
    ...(type !== schema.FilterActionType.ALL ? { type } : {}),
    ...(period && periodDate ? { 'date[after]': periodDate.after, 'date[before]': periodDate.before } : {}),
    ...(subscribeOnly ? { subscribeOnly: true } : {}),
    longitude,
    latitude,
  }
}
