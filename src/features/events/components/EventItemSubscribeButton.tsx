import { ComponentProps } from 'react'
import { VoxButton } from '@/components/Button'
import { useSubscribeEvent, useUnsubscribeEvent } from '@/services/events/hook'
import { RestItemEvent } from '@/services/events/schema'
import { Calendar, CalendarOff, HelpingHand } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { isWeb, XStack } from 'tamagui'
import {
  isEventAdherentDuesReserved,
  isEventAdherentReserved,
  isEventPartial,
  isEventRegister,
  isEventToggleRegisterDisabled,
  isEventToggleRegisterHided,
} from '../utils'

type EventItemSubscribeButtonProps = {
  event: Partial<RestItemEvent> & Pick<RestItemEvent, 'uuid'>
}

type ButtonProps = Pick<ComponentProps<typeof VoxButton>, 'disabled'> &
  Pick<RestItemEvent, 'uuid'> & {
    isPremium?: boolean
  }

export const EventItemSubscribePremiumLockButton = ({ uuid, isPremium, isDue, ...buttonProps }: ButtonProps & { isDue?: Boolean }) => {
  const { mutate, isPending } = useUnsubscribeEvent({ id: uuid })
  const handlePress = () => {
    mutate()
  }
  const button = (
    <VoxButton
      iconLeft={HelpingHand}
      variant="outlined"
      theme={'yellow'}
      testID="event-item-subscribe-lock-button"
      loading={isPending}
      onPress={handlePress}
      {...buttonProps}
    >
      {isDue ? 'Me mettre à jour et m’inscrire' : 'J’adhère pour m’inscrire'}
    </VoxButton>
  )
  return buttonProps.disabled ? (
    button
  ) : (
    <Link href="/profil/cotisations-et-dons" asChild={!isWeb} disabled={buttonProps.disabled}>
      {button}
    </Link>
  )
}

export const EventItemUnSubscribeButton = ({ uuid, isPremium, ...buttonProps }: ButtonProps) => {
  const { mutate, isPending } = useUnsubscribeEvent({ id: uuid })
  const handlePress = () => {
    mutate()
  }
  return (
    <VoxButton
      iconLeft={CalendarOff}
      variant="outlined"
      theme={isPremium ? 'yellow' : 'blue'}
      testID="event-item-unsubscribe-button"
      loading={isPending}
      onPress={handlePress}
      {...buttonProps}
    >
      Me désinscrire
    </VoxButton>
  )
}

export const EventItemSubscribeButton = ({ uuid, isPremium, ...buttonProps }: ButtonProps) => {
  const { mutate, isPending } = useSubscribeEvent({ id: uuid })
  const handlePress = () => {
    mutate()
  }
  return (
    <VoxButton
      iconLeft={Calendar}
      variant="outlined"
      theme={isPremium ? 'yellow' : 'blue'}
      testID="event-item-subscribe-button"
      loading={isPending}
      onPress={handlePress}
      {...buttonProps}
    >
      M'inscrire
    </VoxButton>
  )
}

export const EventItemToggleSubscribeButton = ({ event, userUuid }: EventItemSubscribeButtonProps & { userUuid?: string }) => {
  const isRegister = isEventRegister(event)
  const ButtonSub = isRegister ? EventItemUnSubscribeButton : EventItemSubscribeButton
  const isDisabled = isEventToggleRegisterDisabled(event)
  const shouldHide = isEventToggleRegisterHided(event, userUuid)
  const isAdh = isEventAdherentReserved(event)
  const isAdhDues = isEventAdherentDuesReserved(event)
  const isLocked = isEventPartial(event)
  const ButtonLock = (props: ButtonProps) => <EventItemSubscribePremiumLockButton {...props} isDue={isAdhDues} />
  const Button = [isAdhDues || isAdh, isLocked].every(Boolean) ? ButtonLock : ButtonSub

  if (shouldHide) return false
  return (
    <XStack testID="event-item-toggle-subscribe-button">
      <Button uuid={event.uuid} disabled={isDisabled} isPremium={isEventAdherentReserved(event) || isEventAdherentDuesReserved(event)} />
    </XStack>
  )
}
