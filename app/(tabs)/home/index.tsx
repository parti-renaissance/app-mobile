import EuCampaignIllustration from '@/assets/illustrations/EuCampaignNineJune'
import { Header } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Stack as RouterStack } from 'expo-router'
import { Stack, Text, useMedia, YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
  const media = useMedia()
  return (
    <>
      <RouterStack.Screen
        options={{
          header: () => <Header hideLogo />,
        }}
      />
      <YStack flex={1}>
        <PageLayout sidebar={<Text>Test</Text>}>
          <Stack $gtSm={{ flexDirection: 'row', gap: 8 }} flex={1}>
            {media.gtSm && (
              <YStack flex={2} gap={2} mt="$3" $gtSm={{ padding: '$4' }}>
                <EuCampaignIllustration />
              </YStack>
            )}
            <Stack flex={1} $gtSm={{ flex: 10 }} gap={2}>
              <BoundarySuspenseWrapper loadingMessage="Nous chargons votre fil">
                <HomeFeedList />
              </BoundarySuspenseWrapper>
            </Stack>
          </Stack>
        </PageLayout>
      </YStack>
    </>
  )
}

export default HomeScreen
