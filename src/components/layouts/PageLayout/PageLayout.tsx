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
      <Stack $gtSm={{ flex: 12, padding: 2, margin: '$4', gap: 2 }}>
        <Stack flexDirection="column" $gtSm={{ flexDirection: 'row', gap: '$8' }}>
          {media.gtSm && props.sidebar && (
            <Stack flex={4} borderColor={'$gray3'} borderWidth={1}>
              {props.sidebar}
            </Stack>
          )}
          <Stack
            borderColor={'$gray3'}
            $gtSm={{
              flex: 8,
              borderWidth: 1,
              backgroundColor: '$gray2',
              padding: '$4',
            }}
            height={'100%'}
          >
            {props.children}
          </Stack>
        </Stack>
      </Stack>
    </YStack>
  )
}

export default HomeFeedList
