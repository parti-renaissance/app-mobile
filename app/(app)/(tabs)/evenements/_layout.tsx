import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { NavBar, ProfileNav, VoxHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Link, Redirect, Slot } from 'expo-router'
import { XStack } from 'tamagui'

export default function AppLayout() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return (
      <>
        <VoxHeader justifyContent="space-between">
          <XStack flex={1} flexBasis={0}>
            <Link href="/" replace>
              <EuCampaignIllustration cursor="pointer" showText={false} />
            </Link>
          </XStack>
          <ProfileNav flex={1} flexBasis={0} justifyContent="flex-end" />
        </VoxHeader>
        <Slot />
      </>
    )
  }

  return <Slot />
}
