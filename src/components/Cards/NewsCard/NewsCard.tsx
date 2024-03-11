import { Button } from '@/components'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { XStack } from 'tamagui'

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
        <Button variant="outlined" onPress={onShare}>
          <Button.Text>Partager</Button.Text>
        </Button>

        <Button variant="contained" onPress={onShow}>
          <Button.Text>Lire en entier</Button.Text>
        </Button>
      </XStack>
    </VoxCard>
  )
}

export default NewsCard
