import { Button } from '@/components'
import VoxCard, { VoxCardFrameProps } from '@/components/VoxCard/VoxCard'
import { XStack } from 'tamagui'

export type AlertVoxCardProps = {
  onShow?: () => void
  payload: {
    title: string
    tag: string
    image?: string
    description: string
    ctaLabel: string | null
    ctaLink: string | null
  }
} & VoxCardFrameProps

const AlertCard = ({ payload, onShow, ...props }: AlertVoxCardProps) => {
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <XStack justifyContent="space-between">
          <VoxCard.Chip news>{payload.tag}</VoxCard.Chip>
        </XStack>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {!!payload.image && <VoxCard.Image image={payload.image} />}
        <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
        {!!payload.ctaLabel && (
          <XStack justifyContent="flex-end">
            <Button variant="contained" onPress={onShow}>
              <Button.Text>{payload.ctaLabel}</Button.Text>
            </Button>
          </XStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

export default AlertCard
