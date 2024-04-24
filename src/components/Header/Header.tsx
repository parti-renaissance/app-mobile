import React, { Suspense } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import ProfilePopover from '@/components/ProfilePopover/ProfilePopover'
import { ROUTES } from '@/config/routes'
import { useSession } from '@/ctx/SessionProvider'
import { useGetProfil } from '@/hooks/useProfil'
import { ArrowLeft, ChevronDown } from '@tamagui/lucide-icons'
import { Link, usePathname, useSegments } from 'expo-router'
import { Button, Circle, Spinner, Stack, StackProps, styled, Text, useMedia, View } from 'tamagui'
import { SignInButton, SignUpButton } from '../Buttons/AuthButton'
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
    <Link href={`/(tabs)/${props.route.name}`} asChild key={props.route.name}>
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
    </Link>
  )
}

const MemoizedNavItem = React.memo(NavItem)

const NavBar = () => {
  const pathname = usePathname()
  const { gtSm } = useMedia()
  const { session } = useSession()
  if (!session) return null
  return gtSm ? (
    <Stack flexDirection="row" gap={4}>
      {ROUTES.filter((x) => !x.hidden).map((route) => {
        const isIndex = route.name === '(home)'
        const focused = pathname.includes(route.name) || (isIndex && pathname === '/')
        return <MemoizedNavItem key={route.name} route={route} isActive={focused} />
      })}
    </Stack>
  ) : null
}

const ProfileView = () => {
  const { data: profile } = useGetProfil()
  return (
    <View flexDirection="row" gap={'$4'} justifyContent="space-between" alignItems="center">
      <Stack gap={4} flexDirection="column" alignContent="flex-end" alignItems="flex-end">
        <Text fontFamily={'$PublicSans'} color="$textPrimary" fontWeight={'500'} fontSize={14}>
          {profile?.first_name} {profile?.last_name}
        </Text>
      </Stack>
      <ProfilePicture fullName={`${profile?.first_name} ${profile?.last_name}`} src={undefined} alt="profile picture" size="$4" rounded />
    </View>
  )
}

const LoginView = () => (
  <View flexDirection="row" gap={'$4'} justifyContent="space-between" alignItems="center">
    <Stack gap={'$2'} flexDirection="row">
      <SignInButton />
      <SignUpButton />
    </Stack>
  </View>
)

const Header: React.FC = (props: StackProps) => {
  const { session } = useSession()
  const segments = useSegments()
  const isNested = segments.length > 2
  const backPath = segments
    .filter((x: string) => !x.startsWith('('))
    .slice(0, -1)
    .join('/')

  const BackBtn = () => (
    <Stack justifyContent="center" alignItems="center">
      <Link href={backPath as never} asChild>
        <TouchableWithoutFeedback>
          <Circle size="$3" borderWidth="$1" borderColor="$gray3" pressStyle={{ backgroundColor: '$gray1' }}>
            <ArrowLeft color="$textDisabled" />
          </Circle>
        </TouchableWithoutFeedback>
      </Link>
    </Stack>
  )
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
      <Container borderBottomWidth={2} borderBottomColor="rgba(145, 158, 171, 0.32)" paddingHorizontal={'$4'} height={82} {...props} alignContent="center">
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
          {isNested ? (
            <BackBtn />
          ) : (
            <Link href={'/(tabs)/(home)'}>
              <EuCampaignIllustration />
            </Link>
          )}
          {!isNested && <NavBar />}
          {session ? (
            <Suspense
              fallback={
                <View justifyContent="center" alignItems="flex-end" flex={1} height="100%">
                  <Spinner color="$blue7" size="small" />
                </View>
              }
            >
              <ProfilePopover>
                <View flexDirection="row" alignItems="center" gap={'$3'}>
                  <ProfileView />
                  <ChevronDown size={16} color="$gray6" />
                </View>
              </ProfilePopover>
            </Suspense>
          ) : (
            <LoginView />
          )}
        </Stack>
      </Container>
    </SafeAreaView>
  )
}

export default Header
