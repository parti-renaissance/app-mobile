import { NamedExoticComponent } from 'react'
import { SmallHeader, VoxHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import type { IconProps } from '@tamagui/helpers-icon'
import { ArrowLeft, CircleUser, HelpingHand, MessageCircle, Settings2, TreeDeciduous } from '@tamagui/lucide-icons'
import { Redirect, router, Stack } from 'expo-router'
import { useMedia } from 'tamagui'

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

  return (
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
  )
}
