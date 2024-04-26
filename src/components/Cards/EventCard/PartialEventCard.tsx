import { ImageRequireSource } from 'react-native'
import Button from '@/components/Button'
import VoxCard, { VoxCardDateProps, VoxCardFrameProps } from '@/components/VoxCard/VoxCard'
import { XStack } from 'tamagui'

type VoxCardBasePayload = {
  id: string
  title: string
  image?: string | ImageRequireSource
  isOnline: boolean
  date: VoxCardDateProps
}

export type PartialEventVoxCardProps = {
  onSubscribe?: () => void
  onShow?: () => void
  payload: VoxCardBasePayload
} & VoxCardFrameProps

const PartialEventCard = ({ payload, onSubscribe, onShow, ...props }: PartialEventVoxCardProps) => {
  const image = payload.image ?? require('@/assets/images/eventRestrictedImagePlaceholder.png')
  return (
    <VoxCard {...props}>
      <VoxCard.Content minHeight={200} justifyContent="space-between">
        <VoxCard.Content p={0}>
          <VoxCard.Chip event>Evenement</VoxCard.Chip>
          <VoxCard.Title>{payload.title}</VoxCard.Title>
          {image && <VoxCard.Image image={image} />}
        </VoxCard.Content>
        <VoxCard.Date {...payload.date} />
        <XStack justifyContent={'flex-end'}>
          <Button variant="outlined" onPress={onShow}>
            <Button.Text>Voir l'événement</Button.Text>
          </Button>
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default PartialEventCard
