import React from 'react'
import { ActionVoxCardProps } from '@/components/Cards/ActionCard'
import { Action, ActionType, FilterActionType, isFullAction, RestAction } from '@/services/actions/schema'
import { addDays, isBefore, isSameDay, isSameWeek, setHours } from 'date-fns'
import MapboxGl from '../Mapbox/Mapbox'
import { SelectPeriod } from './ActionFiltersList'

export function mapPayload(action: Action): ActionVoxCardProps['payload'] {
  return {
    id: action.uuid,
    tag: action.type,
    isSubscribed: Boolean(action.user_registered_at),
    date: {
      start: action.date,
      end: action.date,
    },
    status: action.status,
    location: {
      city: action.post_address.city_name,
      street: action.post_address.address,
      postalCode: action.post_address.postal_code,
    },
    author: {
      name: `${action.author.first_name} ${action.author.last_name}`,
      role: action.author.role ?? null,
      title: action.author.instance ?? null,
      pictureLink: action.author.image_url ?? undefined,
    },
    attendees: isFullAction(action)
      ? undefined
      : {
          count: action.participants_count,
          pictures: action.first_participants.map((x) => x.adherent),
        },
  }
}

export function useSheetPosition(defaultPosition: number) {
  const [position, setPosition] = React.useState(defaultPosition)
  const handleHandlePress = () => {
    switch (position) {
      case 0:
        setPosition(1)
        break
      case 1:
        setPosition(0)
        break
      default:
        setPosition(0)
    }
  }
  return {
    defaultPosition,
    position,
    setPosition,
    handleHandlePress,
  }
}

export const getToday = setHours(new Date(), 0)
export const getTomorow = setHours(addDays(new Date(), 1), 0)

export const passPeriod = (date: Date, period: SelectPeriod) => {
  switch (period) {
    case 'today':
      return isSameDay(date, new Date())
    case 'tomorow':
      return isSameDay(date, addDays(new Date(), 1))
    case 'week':
      return isSameWeek(new Date(), date)
    default:
      return true
  }
}

export const passType = (type: FilterActionType, actionType: ActionType) => {
  return type === FilterActionType.ALL || (actionType as unknown as Omit<FilterActionType, 'all'>) === type
}

export function createSource(actions: RestAction[], active: string): MapboxGl.ShapeSource['props']['shape'] {
  return {
    type: 'FeatureCollection',
    features: actions.map((action) => {
      const isActive = action.uuid === active
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [action.post_address.longitude, action.post_address.latitude],
        },
        properties: {
          priority: isActive ? 1 : 0,
          isRegister: !!action.user_registered_at,
          isPassed: isBefore(action.date, new Date()),
          isActive,
          ...action,
        },
      }
    }),
  }
}
