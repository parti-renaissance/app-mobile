import { VoxButton } from '@/components/Button'
import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { genericErrorThrower } from '@/services/common/errors/generic-errors'
import { Bell, ExternalLink } from '@tamagui/lucide-icons'
import * as WebBrowser from 'expo-web-browser'
import { isWeb, XStack } from 'tamagui'

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

const NewsCard = ({ payload, ...props }: NewsVoxCardProps) => {
  const onShow = async () => {
    if (payload.ctaLink) {
      const url = payload.ctaLink
      try {
        if (isWeb) {
          window.open(url, '_blank')
        } else {
          WebBrowser.openBrowserAsync(url)
        }
      } catch (error) {
        genericErrorThrower(error)
      }
    }
  }
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <XStack justifyContent="space-between">
          <VoxCard.Chip icon={Bell} theme="gray">
            {payload.tag}
          </VoxCard.Chip>
          <VoxCard.Date {...payload.date} icon={false} />
        </XStack>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        {!!payload.image && <VoxCard.Image image={payload.image} />}
        <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
        {!!payload?.author?.name && <VoxCard.Author author={payload.author} />}
        {!!payload.ctaLabel && (
          <XStack justifyContent="flex-end">
            <VoxButton iconLeft={ExternalLink} variant="outlined" minWidth={80} onPress={onShow}>
              {payload.ctaLabel}
            </VoxButton>
          </XStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

export default NewsCard
