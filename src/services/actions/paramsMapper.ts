import { addDays, endOfDay, startOfDay } from 'date-fns'
import * as schema from './schema'

const calcPeriod = (period?: schema.SelectPeriod) => {
  switch (period) {
    case 'past':
      return {
        before: startOfDay(new Date()).toISOString(),
      }
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
    case 'to-come':
    default:
      return {
        after: new Date().toISOString(),
      }
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
