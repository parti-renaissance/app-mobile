import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { Button, Text, XStack } from 'tamagui'

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
        <Button size="$2.5" backgroundColor="$white1" borderWidth="$1" paddingHorizontal="$4" borderColor="$gray3" onPress={onShow}>
          <Text fontFamily="$PublicSans" fontWeight="$6" color="$gray8">
            Voir l'événement
          </Text>
        </Button>
        {payload.isSubscribed ? (
          <Button size="$2.5" chromeless paddingHorizontal="$4" onPress={onSubscribe}>
            <Text fontFamily="$PublicSans" fontWeight="$6" color="$blue6">
              Inscrit(e)
            </Text>
          </Button>
        ) : (
          <Button size="$2.5" backgroundColor="$gray8" paddingHorizontal="$4" onPress={onSubscribe}>
            <Text fontFamily="$PublicSans" fontWeight="$6" color="$white1">
              M'inscrire
            </Text>
          </Button>
        )}
      </XStack>
    </VoxCard>
  )
}

export default EventCard
