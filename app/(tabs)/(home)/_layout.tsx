import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import Header, { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Redirect, Stack } from 'expo-router'

export default function AppLayout() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }
  const config = { title: '' }
  return (
    <Stack screenOptions={{ header: (props) => <SmallHeader {...props} />, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: '', header: Header, headerLeft: () => <EuCampaignIllustration /> }} />
      <Stack.Screen name="(modals)/news-detail" options={config} />
      <Stack.Screen name="(modals)/event-detail" options={config} />
      <Stack.Screen name="(modals)/poll-detail" options={config} />
    </Stack>
  )
}
