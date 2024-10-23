import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { ProfileNav, VoxHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Link, Redirect, Stack } from 'expo-router'
import { useMedia, XStack } from 'tamagui'

const HomeHeader = () => {
  return (
    <VoxHeader justifyContent="space-between" backgroundColor="$textSurface">
      <XStack flex={1} flexBasis={0}>
        <Link href="/" replace>
          <EuCampaignIllustration cursor="pointer" />
        </Link>
      </XStack>
      <ProfileNav flex={1} flexBasis={0} justifyContent="flex-end" />
    </VoxHeader>
  )
}

export default function AppLayout() {
  const { isAuth } = useSession()
  const media = useMedia()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }
  const config = { title: '' }
  return (
    <Stack
      screenOptions={{
        header: () => (media.md ? <HomeHeader /> : null),
        headerLeft: () => <EuCampaignIllustration />,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(modals)/event-detail" options={config} />
      <Stack.Screen name="(modals)/poll-detail" options={config} />
    </Stack>
  )
}
