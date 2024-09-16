import { Button } from '@/components'
import { VoxButton } from '@/components/Button'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { XStack } from 'tamagui'

export type NewsVoxCardProps = {
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

const NewsCard = ({ payload, onShow, ...props }: NewsVoxCardProps) => {
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <XStack justifyContent="space-between">
          <VoxCard.Chip theme="gray">{payload.tag}</VoxCard.Chip>
          <VoxCard.Date {...payload.date} icon={false} />
        </XStack>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {!!payload.image && <VoxCard.Image image={payload.image} />}
        <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
        {!!payload?.author?.name && <VoxCard.Author author={payload.author} />}
        {!!payload.ctaLabel && (
          <XStack justifyContent="flex-end">
            <VoxButton variant="contained" onPress={onShow}>
              {payload.ctaLabel}
            </VoxButton>
          </XStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

export default NewsCard
