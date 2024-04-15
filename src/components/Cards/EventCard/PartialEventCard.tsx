import VoxCard, { VoxCardDateProps, VoxCardFrameProps } from '@/components/VoxCard/VoxCard'
import { YStack } from 'tamagui'

type VoxCardBasePayload = {
  id: string
  title: string
  image?: string
  isOnline: boolean
  date: VoxCardDateProps
}

export type PartialEventVoxCardProps = {
  onSubscribe?: () => void
  onShow?: () => void
  payload: VoxCardBasePayload
} & VoxCardFrameProps

const PartialEventCard = ({ payload, onSubscribe, onShow, ...props }: PartialEventVoxCardProps) => {
  return (
    <VoxCard {...props}>
      <VoxCard.Content minHeight={200} justifyContent="space-between">
        <VoxCard.Content p={0}>
          <VoxCard.Chip event>Evenement</VoxCard.Chip>
          <VoxCard.Title>{payload.title}</VoxCard.Title>
          {payload.image && <VoxCard.Image image={payload.image} />}
        </VoxCard.Content>
        <VoxCard.Date {...payload.date} />
      </VoxCard.Content>
    </VoxCard>
  )
}

export default PartialEventCard
