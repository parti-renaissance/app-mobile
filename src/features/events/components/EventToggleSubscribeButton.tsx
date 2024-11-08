import { ComponentPropsWithoutRef } from 'react'
import { VoxButton } from '@/components/Button'
import { RestItemEvent } from '@/services/events/schema'
import { XStack } from 'tamagui'
import {
  isEventAdherentDuesReserved,
  isEventAdherentReserved,
  isEventPartial,
  isEventRegister,
  isEventToggleRegisterDisabled,
  isEventToggleRegisterHided,
} from '../utils'
import { EventSubscribeButton } from './EventSubscribeButton'
import { EventSubscribePremiumLockButton, type PremiumLockButtonProps } from './EventSubscribePremiumLockButton'
import { EventUnSubscribeButton } from './EventUnSubscribeButton'

type EventItemSubscribeButtonProps = {
  event: Partial<RestItemEvent> & Pick<RestItemEvent, 'uuid'>
  userUuid?: string
  buttonProps?: ComponentPropsWithoutRef<typeof VoxButton>
}

export const EventToggleSubscribeButton = ({ event, userUuid, buttonProps }: EventItemSubscribeButtonProps) => {
  const isRegister = isEventRegister(event)
  const ButtonSub = isRegister ? EventUnSubscribeButton : EventSubscribeButton
  const shouldHide = [isEventToggleRegisterDisabled(event), isEventToggleRegisterHided(event, userUuid)].some(Boolean)
  const isAdh = isEventAdherentReserved(event)
  const isAdhDues = isEventAdherentDuesReserved(event)
  const isLocked = isEventPartial(event)
  const ButtonLock = (props: PremiumLockButtonProps) => <EventSubscribePremiumLockButton {...props} isDue={isAdhDues} />
  const Button = [isAdhDues || isAdh, isLocked].every(Boolean) ? ButtonLock : ButtonSub

  if (shouldHide) return false
  return (
    <XStack testID="event-toggle-subscribe-button">
      <Button uuid={event.uuid} userUuid={userUuid} isPremium={isEventAdherentReserved(event) || isEventAdherentDuesReserved(event)} {...buttonProps} />
    </XStack>
  )
}
