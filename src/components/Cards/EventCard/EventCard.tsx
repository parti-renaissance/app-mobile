import { Button } from '@/components'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { XStack } from 'tamagui'

type VoxCardBasePayload = {
  title: string
  tag: string
  image?: string
  isSubscribed: boolean
  isOnline: boolean
  location?: VoxCardLocationProps['location']
} & VoxCardDateProps &
  VoxCardAuthorProps

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
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <VoxCard.Chip event>{payload.tag}</VoxCard.Chip>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {payload.image && <VoxCard.Image image={payload.image} />}
        <VoxCard.Date date={payload.date} />
        {payload.isOnline ? <VoxCard.Visio /> : <VoxCard.Location location={payload.location} />}
        <VoxCard.Author author={payload.author} />
        <XStack justifyContent="space-between">
          <Button variant="outlined" onPress={onShow}>
            <Button.Text>Voir l'événement</Button.Text>
          </Button>
          {payload.isSubscribed ? (
            <Button variant="text" onPress={onSubscribe}>
              <Button.Text color="$blue6">Inscrit(e)</Button.Text>
            </Button>
          ) : (
            <Button variant="contained" onPress={onSubscribe}>
              <Button.Text>M'inscrire</Button.Text>
            </Button>
          )}
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default EventCard
