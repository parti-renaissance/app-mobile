import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import Header, { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Stack } from 'expo-router'

export default function EventLayout() {
  const { isAuth } = useSession()
  return (
    <Stack screenOptions={{ header: (x) => <SmallHeader {...x} />, animation: 'slide_from_right' }}>
      <Stack.Screen
        name="index"
        options={isAuth ? { title: 'Événements' } : { header: (x) => <Header {...x} />, title: 'Événements', headerLeft: () => <EuCampaignIllustration /> }}
      />
      <Stack.Screen name="[mode]/filters" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="[id]" options={{ title: '' }} />
    </Stack>
  )
}
