import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { Button, Text, XStack } from 'tamagui'

export interface NewsVoxCardProps {
  onShare?: () => void
  onShow?: () => void
  payload: {
    title: string
    tag: string
    image?: string
    description: string
  } & VoxCardDateProps &
    VoxCardLocationProps &
    VoxCardAuthorProps
}

const NewsCard = ({ payload, onShare, onShow }: NewsVoxCardProps) => {
  return (
    <VoxCard>
      <VoxCard.Chip news>{payload.tag}</VoxCard.Chip>
      <VoxCard.Title>{payload.title}</VoxCard.Title>
      {payload.image && <VoxCard.Image image={payload.image} />}
      <VoxCard.Description>{payload.description}</VoxCard.Description>
      <VoxCard.Author author={payload.author} />
      <XStack justifyContent="space-between">
        <Button size="$2.5" backgroundColor="$white1" borderWidth="$1" paddingHorizontal="$4" borderColor="$gray3" onPress={onShare}>
          <Text fontFamily="$PublicSans" fontWeight="$6" color="$gray8">
            Partager
          </Text>
        </Button>

        <Button size="$2.5" backgroundColor="$gray8" paddingHorizontal="$4" onPress={onShow}>
          <Text fontFamily="$PublicSans" fontWeight="$6" color="$white1">
            Lire en entier
          </Text>
        </Button>
      </XStack>
    </VoxCard>
  )
}

export default NewsCard
