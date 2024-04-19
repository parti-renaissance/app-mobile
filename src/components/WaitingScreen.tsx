import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { Spinner, YStack } from 'tamagui'

export default function WaitingScreen() {
  return (
    <YStack justifyContent="center" alignItems="center" gap="$4" height="100%" flex={1} position="absolute" top={0} left={0} width="100%" pointerEvents="none">
      <EuCampaignIllustration />
      <Spinner color="$blue7" size="large" />
    </YStack>
  )
}
