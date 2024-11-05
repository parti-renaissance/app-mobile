import { RestFullEvent, RestItemEvent, RestPartialEvent } from '@/services/events/schema'
import { isPast } from 'date-fns'

export const isEventPast = (event: Partial<RestItemEvent>) => {
  const date = event.finish_at || event.begin_at
  return date ? isPast(new Date(date)) : false
}

export const isEventCancelled = (
  event: Partial<RestItemEvent>,
): event is Partial<RestItemEvent> & {
  status: 'CANCELLED'
} => {
  return event.status === 'CANCELLED'
}

export const isEventFull = (event: Partial<RestItemEvent>): event is Partial<RestFullEvent> => {
  return event.object_state === 'full'
}

export const isEventCapacityReached = (event: Partial<RestItemEvent>) => {
  if (isEventFull(event) && event.participants_count !== undefined) {
    return event.capacity && event.participants_count >= event.capacity
  }
  return false
}

export const isEventPartial = (event: Partial<RestItemEvent>): event is Partial<RestPartialEvent> => {
  return event.object_state === 'partial'
}

export const isEventAdherentReserved = (event: Partial<RestItemEvent>) => {
  return event.visibility === 'adherent'
}

export const isEventAdherentDuesReserved = (event: Partial<RestItemEvent>) => {
  return event.visibility === 'adherent_dues'
}

export const isEventPrivate = (event: Partial<RestItemEvent>) => {
  return event.visibility === 'private'
}

export const isAdherentLock = (event: Partial<RestItemEvent>) => isEventPartial(event) && isEventAdherentReserved(event)
export const isAdherentDuesLock = (event: Partial<RestItemEvent>) => isEventPartial(event) && isEventAdherentDuesReserved(event)

export const isEventEditable = (
  event: Partial<RestItemEvent>,
): event is Partial<RestFullEvent> & {
  object_state: 'full'
  editable: true
  edit_link: string
} => {
  return Boolean(isEventFull(event) && event.editable && event.edit_link)
}

export const isEventRegister = (
  event: Partial<RestItemEvent>,
): event is Partial<RestFullEvent> & {
  object_state: 'full'
  user_registered_at: string
} => {
  return Boolean(isEventFull(event) && event.user_registered_at)
}

export const isEventToggleRegisterDisabled = (event: Partial<RestItemEvent>) =>
  [isEventCancelled(event), isEventPast(event), isEventCapacityReached(event) && !isEventRegister(event)].some(Boolean)

export const isEventUserAuthor = (event: Partial<RestItemEvent>, userUuid?: string) =>
  typeof userUuid === 'string' && typeof event.organizer?.uuid === 'string' && userUuid === event.organizer.uuid

export const isEventToggleRegisterHided = (event: Partial<RestItemEvent>, userUuid?: string) => [isEventUserAuthor(event, userUuid)].some(Boolean)

export const getEventItemImageFallback = (event: Partial<RestItemEvent>, userUuid?: string) => {
  if (isEventPrivate(event) && !event.image_url && !userUuid) {
    return require('@/features/events/assets/images/event-fallback-private-lock.png')
  }
  return event.image_url
}

export const getEventDetailImageFallback = (event: Partial<RestItemEvent>, userUuid?: string) => {
  if (isEventPrivate(event) && !event.image_url && !userUuid) {
    return require('@/features/events/assets/images/event-fallback-private-lock.png')
  }
  return event.image_url ?? require('@/features/events/assets/images/event-fallback.png')
}
