import React, { ComponentProps, useMemo } from 'react'
import { ImageRequireSource } from 'react-native'
import { Button } from '@/components'
import { VoxAlertDialog } from '@/components/AlertDialog'
import { VoxButton } from '@/components/Button'
import InternAlert from '@/components/InternAlert/InternAlert'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import { useSubscribeEvent, useUnsubscribeEvent } from '@/services/events/hook'
import { RestEvent } from '@/services/events/schema'
import { CalendarCheck2, CalendarOff, Eye } from '@tamagui/lucide-icons'
import { isPast } from 'date-fns'
import { router } from 'expo-router'
import { Spinner, XStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

type VoxCardBasePayload = {
  id: string
  title: string
  tag: string
  image?: string | ImageRequireSource
  status?: RestEvent['status']
  isSubscribed?: boolean
  isCompleted?: boolean
  isOnline: boolean
  location?: VoxCardLocationProps['location']
  date: VoxCardDateProps
} & Partial<VoxCardAuthorProps>

export type EventVoxCardProps = {
  onShow?: () => void
  payload:
    | VoxCardBasePayload
    | ({
        isOnline: undefined | false
      } & VoxCardBasePayload &
        VoxCardLocationProps)
    | ({
        isOnline: true
      } & VoxCardBasePayload)
} & VoxCardFrameProps
export const SubscribeEventButton = ({
  isSubscribed,
  eventId: id,
  outside = false,
  ...btnProps
}: { eventId: string; isSubscribed: boolean; outside?: boolean } & ComponentProps<typeof Button>) => {
  const { session } = useSession()
  const { mutate: subscribe, isPending: isSubPending } = useSubscribeEvent({ id })
  const { mutate: unsubscribe, isPending: isUnSubPending } = useUnsubscribeEvent({ id })
  const handleSubscribe = useDebouncedCallback(() => (isSubscribed ? unsubscribe() : subscribe()), 200)
  const outsideStyle = outside ? ({ size: 'lg', width: '100%' } as const) : {}
  return isSubscribed ? (
    <VoxAlertDialog theme="blue" title="Se désinscrire" description={`Voulez-vous vraiment vous désinscrire de l'événement ?`} onAccept={handleSubscribe}>
      <VoxButton theme="blue" variant="outlined" loading={isUnSubPending} iconLeft={CalendarOff} {...btnProps} {...outsideStyle}>
        Me désinscrire
      </VoxButton>
    </VoxAlertDialog>
  ) : (
    <VoxButton
      variant="outlined"
      theme="blue"
      onPress={
        session
          ? handleSubscribe
          : () =>
              router.push({
                pathname: '/(tabs)/evenements/[id]',
                params: { id },
              })
      }
      iconLeft={CalendarCheck2}
      loading={isSubPending}
      {...btnProps}
      {...outsideStyle}
    >
      M'inscrire
    </VoxButton>
  )
}

const EventCard = ({ payload, onShow, ...props }: EventVoxCardProps) => {
  const isCancelled = payload.status === 'CANCELLED'
  const isPassed = isPast(payload.date.end ?? payload.date.start)
  const canSubscribe = [
    !isPast(payload.date.end),
    payload.isSubscribed !== undefined,
    !isCancelled,
    !payload.isCompleted || (payload.isCompleted && payload.isSubscribed),
  ].every(Boolean)

  const status = useMemo(() => {
    if (isCancelled) {
      return (
        <InternAlert borderLess type="danger">
          Événement annulée.
        </InternAlert>
      )
    } else if (isPassed) {
      return <InternAlert borderLess>Événement passée.</InternAlert>
    } else if (payload.isCompleted) {
      return (
        <InternAlert borderLess type="info">
          Événement complet.
        </InternAlert>
      )
    }
    return null
  }, [isCancelled, isPassed, payload.isCompleted])

  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <VoxCard.Chip theme="blue">{payload.tag}</VoxCard.Chip>
        {status}
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {payload.image ? <VoxCard.Image image={payload.image} /> : null}
        <VoxCard.Date {...payload.date} />
        {payload.isOnline ? <VoxCard.Visio /> : payload.location && <VoxCard.Location location={payload.location} />}
        {payload.author && <VoxCard.Author author={payload.author} />}
        <XStack justifyContent={'space-between'}>
          <VoxButton variant="outlined" theme="gray" onPress={onShow} iconLeft={Eye}>
            Voir
          </VoxButton>

          <SubscribeEventButton disabled={!canSubscribe} isSubscribed={!!payload.isSubscribed} eventId={payload.id} />
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default EventCard
