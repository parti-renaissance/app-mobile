import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import Header, { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Redirect, Stack } from 'expo-router'
import { useMedia } from 'tamagui'

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
        header: (props) => (media.md ? <SmallHeader {...props} /> : null),
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
