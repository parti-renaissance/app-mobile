import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import ProfilePopover from '@/components/ProfilePopover/ProfilePopover'
import { ROUTES } from '@/config/routes'
import { useSession } from '@/ctx/SessionProvider'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { ArrowLeft, ChevronDown } from '@tamagui/lucide-icons'
import { Link, usePathname } from 'expo-router'
import { capitalize } from 'lodash'
import { Button, isWeb, Spinner, Stack, styled, useMedia, View, XStack, YStackProps } from 'tamagui'
import Text from '../base/Text'
import { SignInButton, SignUpButton } from '../Buttons/AuthButton'
import Container from '../layouts/Container'
import ProfilePicture from '../ProfilePicture'
import AuthFallbackWrapper from '../Skeleton/AuthFallbackWrapper'

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
  const [isHover, setIsHover] = React.useState(false)
  return (
    <Link href={`/(tabs)/${props.route.name}`} asChild key={props.route.name}>
      <ButtonNav
        onHoverIn={() => setIsHover(true)}
        onHoverOut={() => setIsHover(false)}
        animation="bouncy"
        hoverStyle={{
          bg: colorOpacity,
          bc: 'transparent',
        }}
        pressStyle={{
          bg: colorOpacity,
          bc: 'transparent',
        }}
      >
        <Button.Icon scaleIcon={2}>
          <props.route.icon size={28} active={[props.isActive, isHover].some(Boolean)} />
        </Button.Icon>

        <Button.Text $md={{ display: 'none' }} color={props.isActive ? props.route.gradiant[1] : '$gray8'} fontWeight={'500'}>
          {props.route.screenName}
        </Button.Text>
      </ButtonNav>
    </Link>
  )
}

const MemoizedNavItem = React.memo(NavItem)

export const NavBar = () => {
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
  const { user } = useSession()
  const profile = user?.data
  return (
    <View flexDirection="row" gap={'$4'} justifyContent="space-between" alignItems="center">
      {!user.isLoading ? (
        <>
          <Stack gap={4} flexDirection="column" alignContent="flex-end" alignItems="flex-end" display="none" $gtMd={{ display: 'flex' }}>
            <Text fontFamily={'$PublicSans'} color="$textPrimary" fontWeight={'500'} fontSize={14}>
              {profile?.first_name} {profile?.last_name}
            </Text>
          </Stack>
          <ProfilePicture fullName={`${profile?.first_name} ${profile?.last_name}`} src={undefined} alt="profile picture" size="$3" rounded />
        </>
      ) : (
        <Spinner size="small" />
      )}
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

export const ProfileNav = () => {
  return (
    <AuthFallbackWrapper fallback={<LoginView />}>
      <ProfilePopover>
        <View flexDirection="row" alignItems="center" gap={'$3'}>
          <ProfileView />
          <ChevronDown size={16} color="$gray6" />
        </View>
      </ProfilePopover>
    </AuthFallbackWrapper>
  )
}

const Header = (_props: NativeStackHeaderProps & YStackProps) => {
  const { options, navigation, back, ...props } = _props
  const media = useMedia()

  const BackBtn = () => (
    <Stack justifyContent="center" alignItems="center">
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <XStack gap={'$3'} alignItems="center">
          <View flexDirection="row" gap={'$3'} alignItems="center">
            <ArrowLeft color="$textPrimary" />
          </View>
          <Text fontSize="$4" fontWeight="$6">
            {back?.title ?? 'Retour'}
          </Text>
        </XStack>
      </TouchableWithoutFeedback>
    </Stack>
  )

  const LeftNav = () => {
    if (options.headerLeft) return options.headerLeft({ label: back?.title, canGoBack: navigation.canGoBack() })
    if (navigation.canGoBack() && navigation.getState().index > 0) {
      return <BackBtn />
    }
    return media.gtSm && isWeb ? (
      <Link href="/" asChild>
        <View cursor="pointer">
          <EuCampaignIllustration />
        </View>
      </Link>
    ) : (
      <Text fontSize="$4" fontWeight="$6">
        {capitalize(options.title)}
      </Text>
    )
  }
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
      <Container
        borderBottomWidth={options.headerShadowVisible === undefined ? 1 : undefined}
        borderBottomColor="rgba(145, 158, 171, 0.2)"
        paddingHorizontal={'$4'}
        height={82}
        {...props}
        alignContent="center"
      >
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
          <LeftNav />
          {!(navigation.canGoBack() && navigation.getState().index > 0) && <NavBar />}
          {options.headerRight ? options.headerRight({ canGoBack: navigation.canGoBack() }) : <ProfileNav />}
        </Stack>
      </Container>
    </SafeAreaView>
  )
}

export const SmallHeader: typeof Header = (props) => {
  const media = useMedia()
  return <Header {...props} height={media.gtSm ? 82 : 52} />
}

export default Header
