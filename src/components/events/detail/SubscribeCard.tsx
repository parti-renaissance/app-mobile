import React from 'react'
import { Button } from '@/components'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import { SignInButton, SignUpButton } from '@/components/Buttons/AuthButton'
import { SubscribeEventButton } from '@/components/Cards/EventCard'
import { useSession } from '@/ctx/SessionProvider'
import { useOpenExternalContent } from '@/hooks/useOpenExternalContent'
import * as eventTypes from '@/services/events/schema'
import { Unlock } from '@tamagui/lucide-icons'
import { isPast } from 'date-fns'
import { Spinner, useMedia, YStack } from 'tamagui'
import EventRegisterForm from '../EventRegisterForm/EventRegisterForm'
import { RegisterButtonSheet } from './EventComponents'

const AdhButton = (props: { bgColor?: string; children?: string }) => {
  const { isPending, open: handleClick } = useOpenExternalContent({ slug: 'adhesion' })

  return (
    <VoxButton variant="contained" size="lg" width="100%" theme="yellow" onPress={handleClick} loading={isPending}>
      {props.children ?? 'Adhérer'}
    </VoxButton>
  )
}

export function LockAuthCard({ activeSubscription }: { activeSubscription?: boolean }) {
  return (
    <YStack justifyContent="center" gap="$4.5">
      <YStack gap="$3" alignItems="center">
        <Unlock size="$3" rotate="-15deg" color="$textSecondary" />
        <Text fontWeight="$6" fontSize="$1" color="$textSecondary">
          {!activeSubscription ? 'Créer un compte pour participer à d’autres événements similaires' : ' Créer un compte pour participer à cet événement.'}
        </Text>
      </YStack>
      <SignUpButton size="lg" width="100%" />
      <SignInButton size="lg" width="100%" />
    </YStack>
  )
}

export function LockAuthAdhCard({ activeSubscription }: { activeSubscription?: boolean }) {
  return (
    <YStack justifyContent="center" gap="$4.5">
      <YStack gap="$3" alignItems="center">
        <Unlock size="$3" rotate="-15deg" color="$textSecondary" />
        <Text fontWeight="$6" fontSize="$1" color="$textSecondary">
          {!activeSubscription ? 'Adhérez pour participer à d’autres événements similaires' : ' Cet événement est réservé aux adhérents.'}
        </Text>
      </YStack>
      <AdhButton />
      <SignInButton size="lg" width="100%" />
    </YStack>
  )
}

export function LockAdhCard({ activeSubscription }: { activeSubscription?: boolean }) {
  return (
    <YStack justifyContent="center" gap="$4.5">
      <YStack gap="$3" alignItems="center">
        <Unlock size="$3" rotate="-15deg" color="$textSecondary" />
        <Text fontWeight="$6" fontSize="$1" color="$textSecondary">
          {!activeSubscription ? 'Adhérez pour participer à d’autres événements similaires' : 'Cet événement est réservé aux adhérents.'}
        </Text>
      </YStack>
      <AdhButton />
    </YStack>
  )
}

export function LockAdhDueCard({ activeSubscription }: { activeSubscription?: boolean }) {
  return (
    <YStack justifyContent="center" gap="$4.5">
      <YStack gap="$3" alignItems="center">
        <Unlock size="$3" rotate="-15deg" color="$textSecondary" />
        <Text fontWeight="$6" fontSize="$1" color="$textSecondary">
          {!activeSubscription
            ? 'Mettez à jour votre cotisation pour participer à d’autres événements similaires'
            : 'Cet événement est réservé aux adhérents à jour de cotisation.'}
        </Text>
      </YStack>
      <AdhButton>{`Cotiser pour ${new Date().getFullYear()}`}</AdhButton>
    </YStack>
  )
}

export function SubscribePublicCard({ data }: Readonly<{ data: eventTypes.RestEvent }>) {
  const { signIn } = useSession()

  return (
    <YStack gap="$3" width="100%">
      <RegisterButtonSheet id={data.uuid} />
      <Button variant="text" size="lg" width="100%" onPress={() => signIn()}>
        <Text fontSize="$1">
          <Text color="$textPrimary" fontWeight="$7">
            Me connecter
          </Text>{' '}
          <Text color="$textSecondary">pour m’inscrire en un clic.</Text>
        </Text>
      </Button>
    </YStack>
  )
}

export function SubscribeCard({ data }: Readonly<{ data: eventTypes.RestEvent }>) {
  const { isAuth } = useSession()
  const media = useMedia()
  const isEventActive = !(
    isPast(data.finish_at) ||
    data.status === 'CANCELLED' ||
    (eventTypes.isFullEvent(data) && data.capacity && data.participants_count >= data.capacity && !data.user_registered_at)
  )

  if (isAuth) {
    if (eventTypes.isFullEvent(data)) {
      if (!isEventActive) return null
      return <SubscribeEventButton outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
    }

    switch (data.visibility) {
      case 'adherent':
        return <LockAdhCard activeSubscription={isEventActive} />
      case 'adherent_dues':
        return <LockAdhDueCard activeSubscription={isEventActive} />
    }

    // NOT CONNNECTED
  } else {
    if (eventTypes.isFullEvent(data)) {
      if (!isEventActive) return null
      return media.lg ? <SubscribePublicCard data={data} /> : <EventRegisterForm eventId={data.uuid} />
    }

    switch (data.visibility) {
      case 'adherent':
      case 'adherent_dues':
        return <LockAuthAdhCard activeSubscription={isEventActive} />
      default:
        return <LockAuthCard activeSubscription={isEventActive} />
    }
  }
}
