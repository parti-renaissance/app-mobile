import { Button } from '@/components'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { useSubscribeEvent, useUnsubscribeEvent } from '@/hooks/useEvents'
import { XStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

type VoxCardBasePayload = {
  id: string
  title: string
  tag: string
  image?: string
  isSubscribed: boolean
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

const EventCard = ({ payload, onSubscribe, onShow, ...props }: EventVoxCardProps) => {
  const { mutate: subscribe } = useSubscribeEvent(payload.id)
  const { mutate: unsubscribe } = useUnsubscribeEvent(payload.id)
  const handleSubscribe = useDebouncedCallback(() => (payload.isSubscribed ? unsubscribe() : subscribe()), 200)

  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <VoxCard.Chip event>{payload.tag}</VoxCard.Chip>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {payload.image && <VoxCard.Image image={payload.image} />}
        <VoxCard.Date {...payload.date} />
        {payload.isOnline ? <VoxCard.Visio /> : <VoxCard.Location location={payload.location} />}
        <VoxCard.Author author={payload.author} />
        <XStack justifyContent="space-between">
          <Button variant="outlined" onPress={onShow}>
            <Button.Text>Voir l'événement</Button.Text>
          </Button>
          <Button variant={payload.isSubscribed ? 'text' : 'contained'} onPress={handleSubscribe}>
            <Button.Text color={payload.isSubscribed ? '$blue7' : undefined}>{!payload.isSubscribed ? "M'inscrire" : "J'y participe"}</Button.Text>
          </Button>
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default EventCard
