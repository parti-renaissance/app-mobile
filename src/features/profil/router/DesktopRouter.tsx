import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import ProfilMenu from '@/features/profil/components/Menu'
import { TabRouter } from '@react-navigation/native'
import { Navigator, Slot } from 'expo-router'
import { XStack } from 'tamagui'

export default function DesktopProfilRouter() {
  return (
    <Navigator router={TabRouter}>
      <PageLayout>
        <PageLayout.SideBarLeft showOn="gtSm">
          <XStack justifyContent="flex-end">
            <ProfilMenu />
          </XStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <Slot />
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight />
      </PageLayout>
    </Navigator>
  )
}
