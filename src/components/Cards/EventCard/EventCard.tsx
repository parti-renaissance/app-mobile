import { Button } from '@/components'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { XStack } from 'tamagui'

export interface EventVoxCardProps {
  onSubscribe?: () => void
  onShow?: () => void
  payload: {
    title: string
    tag: string
    image?: string
    isSubscribed: boolean
  } & VoxCardDateProps &
    VoxCardLocationProps &
    VoxCardAuthorProps
}

const EventCard = ({ payload, onSubscribe, onShow }: EventVoxCardProps) => {
  return (
    <VoxCard>
      <VoxCard.Chip event>{payload.tag}</VoxCard.Chip>
      <VoxCard.Title>{payload.title}</VoxCard.Title>
      {payload.image && <VoxCard.Image image={payload.image} />}
      <VoxCard.Date date={payload.date} />
      <VoxCard.Location location={payload.location} />
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
    </VoxCard>
  )
}

export default EventCard
