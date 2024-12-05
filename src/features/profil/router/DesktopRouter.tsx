import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import StickyBox from '@/components/StickyBox/StickyBox'
import ProfilMenu from '@/features/profil/components/Menu'
import { TabRouter } from '@react-navigation/native'
import { Navigator, Slot } from 'expo-router'
import { XStack } from 'tamagui'

export default function DesktopProfilRouter() {
  return (
    <Navigator router={TabRouter}>
      <PageLayout webScrollable>
        <PageLayout.SideBarLeft showOn="gtSm">
          <StickyBox offsetTop="$medium" offsetBottom="$xxxlarge">
            <XStack justifyContent="flex-end">
              <ProfilMenu />
            </XStack>
          </StickyBox>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <Slot />
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight />
      </PageLayout>
    </Navigator>
  )
}
