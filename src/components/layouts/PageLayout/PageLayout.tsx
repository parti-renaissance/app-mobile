// first fetch profile,
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignNineJune'
import { Stack, useMedia, YStack } from 'tamagui'

type LayoutPageProps = {
  children: React.ReactNode
  sidebar?: React.ReactNode
}
const HomeFeedList = (props: LayoutPageProps) => {
  const media = useMedia()
  return (
    <YStack flex={1} backgroundColor={'white'} overflow="hidden">
      <Stack $gtSm={{ margin: '$4', gap: 2 }} flex={1}>
        <Stack flexDirection="column" $gtSm={{ flexDirection: 'row', gap: '$4' }} flex={1}>
          {media.gtLg && props.sidebar && (
            <Stack flex={4} borderColor={'$gray3'} borderWidth={1}>
              {props.sidebar}
            </Stack>
          )}
          <Stack
            borderColor={'$gray3'}
            backgroundColor={'$gray2'}
            $sm={{ flex: 1 }}
            $gtSm={{
              flex: 8,
              borderWidth: 1,
            }}
          >
            {props.children}
          </Stack>
        </Stack>
      </Stack>
    </YStack>
  )
}

export default HomeFeedList
