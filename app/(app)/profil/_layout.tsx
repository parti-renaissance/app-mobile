import { NamedExoticComponent } from 'react'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { NavBar, ProfileView, SmallHeader, VoxHeader } from '@/components/Header/Header'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { useSession } from '@/ctx/SessionProvider'
import ProfilMenu from '@/screens/profil/menu/Menu'
import { TabRouter } from '@react-navigation/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import type { IconProps } from '@tamagui/helpers-icon'
import { ArrowLeft, CircleUser, HelpingHand, MessageCircle, Settings2, TreeDeciduous } from '@tamagui/lucide-icons'
import { Link, Navigator, Redirect, router, Slot, Stack, useNavigation, usePathname } from 'expo-router'
import { useMedia, XStack } from 'tamagui'

function CustomRouter() {
  return (
    <Navigator router={TabRouter}>
      <VoxHeader justifyContent="space-between">
        <Link href="/">
          <EuCampaignIllustration cursor="pointer" />
        </Link>
        <NavBar />
        <Link href="/profil">
          <ProfileView />
        </Link>
      </VoxHeader>
      <PageLayout>
        <PageLayout.SideBarLeft>
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

const createProfilHeader = (icon: NamedExoticComponent<IconProps>) => (props: NativeStackHeaderProps) => {
  const media = useMedia()
  return media.sm ? (
    <VoxHeader justifyContent="space-between">
      <VoxHeader.LeftButton icon={ArrowLeft} onPress={router.back} />
      <VoxHeader.Title icon={icon}>{props.options.title ?? ''}</VoxHeader.Title>
      <VoxHeader.LeftButton opacity={0} icon={ArrowLeft} />
    </VoxHeader>
  ) : (
    <SmallHeader {...props} />
  )
}

const IndexHeader = createProfilHeader(CircleUser)
const CotisHeader = createProfilHeader(HelpingHand)
const InfoHeader = createProfilHeader(Settings2)
const ComHeader = createProfilHeader(MessageCircle)
const ElusHeader = createProfilHeader(TreeDeciduous)

export default function AppLayout() {
  const { isAuth } = useSession()
  const media = useMedia()

  if (!isAuth) {
    return <Redirect href={'/(app)/(tabs)/evenements/'} />
  }

  return media.md ? (
    <Stack screenOptions={{ header: (x) => <SmallHeader {...x} />, animation: media.gtSm ? 'none' : 'slide_from_right' }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Mon profil',
          header: (x) => <IndexHeader {...x} />,
        }}
      />

      <Stack.Screen
        name="cotisation-et-dons"
        options={{
          title: 'Cotisation et dons',
          header: (x) => <CotisHeader {...x} />,
        }}
      />

      <Stack.Screen
        name="informations-personnelles"
        options={{
          title: 'Informations personnelles',
          header: (x) => <InfoHeader {...x} />,
        }}
      />

      <Stack.Screen
        name="communications"
        options={{
          title: 'Communication',
          header: (x) => <ComHeader {...x} />,
        }}
      />

      <Stack.Screen
        name="informations-elu"
        options={{
          title: "Information d'élu",
          header: (x) => <ElusHeader {...x} />,
        }}
      />
    </Stack>
  ) : (
    <CustomRouter />
  )
}
