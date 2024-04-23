import { Button } from '@/components'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { XStack } from 'tamagui'

export type NewsVoxCardProps = {
  onShare?: () => void
  onShow?: () => void
  payload: {
    title: string
    tag: string
    image?: string
    description: string
    date: VoxCardDateProps
    ctaLabel: string | null
    ctaLink: string | null
  } & VoxCardLocationProps &
    VoxCardAuthorProps
} & VoxCardFrameProps

const NewsCard = ({ payload, onShare, onShow, ...props }: NewsVoxCardProps) => {
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <XStack justifyContent="space-between">
          <VoxCard.Chip news>{payload.tag}</VoxCard.Chip>
          <VoxCard.Date {...payload.date} icon={false} />
        </XStack>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {payload.image && <VoxCard.Image image={payload.image} />}
        <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
        {payload.author.name && <VoxCard.Author author={payload.author} />}
        {payload.ctaLabel && (
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

export default NewsCard
