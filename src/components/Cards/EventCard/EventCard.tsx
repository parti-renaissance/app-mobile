import { ComponentProps } from 'react'
import { Button } from '@/components'
import { VoxAlertDialog } from '@/components/AlertDialog'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import { useSubscribeEvent, useUnsubscribeEvent } from '@/hooks/useEvents'
import { router } from 'expo-router'
import { XStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

type VoxCardBasePayload = {
  id: string
  title: string
  tag: string
  image?: string
  isSubscribed?: boolean
  isOnline: boolean
  location?: VoxCardLocationProps['location']
  date: VoxCardDateProps
} & VoxCardAuthorProps

export type EventVoxCardProps = {
  onSubscribe?: () => void
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
  const { mutate: subscribe } = useSubscribeEvent({ id })
  const { mutate: unsubscribe } = useUnsubscribeEvent({ id })
  const handleSubscribe = useDebouncedCallback(() => (isSubscribed ? unsubscribe() : subscribe()), 200)
  const outsideStyle = outside ? ({ size: 'lg', width: '100%' } as const) : {}
  return isSubscribed ? (
    <VoxAlertDialog title="Se désinscrire" description={`Voulez-vous vraiment vous désinscrire de l'événement ?`} onAccept={handleSubscribe}>
      <Button variant={outside ? 'outlined' : 'text'} {...btnProps} {...outsideStyle}>
        <Button.Text color="$blue7">Me désinscrire</Button.Text>
      </Button>
    </VoxAlertDialog>
  ) : (
    <Button
      variant="contained"
      onPress={
        session
          ? handleSubscribe
          : () =>
              router.push({
                pathname: '/(tabs)/evenements/[id]',
                params: { id },
              })
      }
      {...btnProps}
      {...outsideStyle}
    >
      <Button.Text>M'inscrire</Button.Text>
    </Button>
  )
}

const EventCard = ({ payload, onSubscribe, onShow, ...props }: EventVoxCardProps) => {
  const knowSubscription = payload.isSubscribed !== undefined

  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <VoxCard.Chip event>{payload.tag}</VoxCard.Chip>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {payload.image && <VoxCard.Image image={payload.image} />}
        <VoxCard.Date {...payload.date} />
        {payload.isOnline ? <VoxCard.Visio /> : payload.location && <VoxCard.Location location={payload.location} />}
        <VoxCard.Author author={payload.author} />
        <XStack justifyContent={knowSubscription ? 'space-between' : 'flex-end'}>
          <Button variant="outlined" onPress={onShow}>
            <Button.Text>Voir l'événement</Button.Text>
          </Button>

          {knowSubscription && <SubscribeEventButton isSubscribed={payload.isSubscribed} eventId={payload.id} />}
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default EventCard
