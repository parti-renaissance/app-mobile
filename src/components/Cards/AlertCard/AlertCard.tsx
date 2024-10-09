import { VoxButton } from '@/components/Button'
import VoxCard, { VoxCardFrameProps } from '@/components/VoxCard/VoxCard'
import type { RestAlertsResponse } from '@/services/alerts/schema'
import { genericErrorThrower } from '@/services/common/errors/generic-errors'
import { BellElectric, ExternalLink } from '@tamagui/lucide-icons'
import * as WebBrowser from 'expo-web-browser'
import { isWeb, XStack } from 'tamagui'

export type AlertVoxCardProps = {
  payload: RestAlertsResponse[0]
} & VoxCardFrameProps

const AlertCard = ({ payload, ...props }: AlertVoxCardProps) => {
  const onShow = async () => {
    if (payload.cta_url) {
      const url = payload.cta_url
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
          <VoxCard.Chip theme="orange" icon={BellElectric}>
            {payload.label}
          </VoxCard.Chip>
        </XStack>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
        {payload.cta_label && payload.cta_url && (
          <XStack justifyContent="flex-end">
            <VoxButton variant="outlined" minWidth={80} iconLeft={ExternalLink} onPress={onShow}>
              {payload.cta_label}
            </VoxButton>
          </XStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

export default AlertCard
