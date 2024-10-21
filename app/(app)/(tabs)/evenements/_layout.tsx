import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import Header, { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Stack } from 'expo-router'

export default function EventLayout() {
  const { isAuth } = useSession()
  return (
    <Stack screenOptions={{ header: (x) => null }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" options={{ title: '' }} />
    </Stack>
  )
}
