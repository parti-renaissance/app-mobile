import React from 'react'
import { Pressable, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { ROUTES } from '@/config/routes'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { Link, router, usePathname } from 'expo-router'
import { Avatar, Button, Stack, StackProps, styled, Text, useMedia, View } from 'tamagui'
import ButtonCustom from '../Button'
import Container from '../layouts/Container'
import ProfilePicture from '../ProfilePicture'

const opacityToHexCode = (hex: string, opacity: number) => {
  const opacityHex = Math.round(opacity * 255).toString(16)
  return `${hex}${opacityHex}`
}

const ButtonNav = styled(Button, {
  backgroundColor: 'transparent',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
})

const NavItem = (props: { route: (typeof ROUTES)[number]; isActive: boolean }) => {
  const colorOpacity = opacityToHexCode(props.route.gradiant[0], 0.09)
  return (
    <TouchableWithoutFeedback
      key={props.route.name}
      onPress={() => {
        router.replace(`/(tabs)/${props.route.name}`)
      }}
    >
      <ButtonNav
        animation="bouncy"
        hoverStyle={{
          bg: props.isActive ? colorOpacity : 'transparent',
          bc: 'transparent',
        }}
        pressStyle={{
          bg: colorOpacity,
          bc: 'transparent',
        }}
      >
        <Button.Icon scaleIcon={2}>
          <props.route.icon size={28} active={props.isActive} />
        </Button.Icon>

        <Button.Text $md={{ display: 'none' }} color={props.isActive ? props.route.gradiant[1] : '$gray8'} fontWeight={'500'}>
          {props.route.screenName}
        </Button.Text>
      </ButtonNav>
    </TouchableWithoutFeedback>
  )
}

const MemoizedNavItem = React.memo(NavItem)

const NavBar = () => {
  const pathname = usePathname()
  const { gtSm } = useMedia()
  return gtSm ? (
    <Stack flexDirection="row" gap={4}>
      {ROUTES.map((route) => {
        const focused = pathname.includes(route.name)
        return <MemoizedNavItem key={route.name} route={route} isActive={focused} />
      })}
    </Stack>
  ) : null
}

const ProfileView = () => {
  const { data: profile } = useGetProfilObserver()
  return profile ? (
    <Link href="/home/profile/">
      <View flexDirection="row" gap={'$4'} justifyContent="space-between" alignItems="center">
        <Stack gap={4} flexDirection="column" alignContent="flex-end" alignItems="flex-end">
          <Text fontFamily={'$PublicSans'} color="$textPrimary" fontWeight={'500'}>
            {profile?.first_name} {profile?.last_name}
          </Text>

          {/* TODO: add the personal code */}
          <Text fontFamily={'$PublicSans'} fontSize={12} color="$textSecondary">
            #000000
          </Text>
        </Stack>
        <ProfilePicture fullName={`${profile?.first_name} ${profile?.last_name}`} src={undefined} alt="profile picture" size="$4" rounded />
      </View>
    </Link>
  ) : (
    <View flexDirection="row" gap={'$4'} justifyContent="space-between" alignItems="center">
      <Stack gap={'$2'} flexDirection="row">
        <ButtonCustom variant="text" height={'$3'}>
          <ButtonCustom.Text color="$textPrimary" fontWeight={'800'}>
            Me connecter
          </ButtonCustom.Text>
        </ButtonCustom>

        <ButtonCustom backgroundColor={'$blue6'} height={'$3'} borderRadius={'$3'} padding={'$3'}>
          <ButtonCustom.Text color={'white'} fontWeight={'800'}>
            J'adhère
          </ButtonCustom.Text>
        </ButtonCustom>
      </Stack>
    </View>
  )
}

const Header: React.FC = (props: StackProps) => {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
      <Container borderBottomWidth={2} borderBottomColor="rgba(145, 158, 171, 0.32)" paddingHorizontal={'$4'} height={82} {...props} alignContent="center">
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
          <Link href={'/home/'}>
            <EuCampaignIllustration />
          </Link>
          <NavBar />
          <ProfileView />
        </Stack>
      </Container>
    </SafeAreaView>
  )
}

export default Header
