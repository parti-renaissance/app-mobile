import React from 'react'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import { ROUTES } from 'app/(tabs)/_layout'
import { Link, usePathname } from 'expo-router'
import { Avatar, Button, Stack, styled, Text, useMedia, View } from 'tamagui'

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

const NavBar: React.FC = () => {
  const pathname = usePathname()
  const media = useMedia()

  const { data: profile } = useGetProfilObserver()

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white"
      borderBottomWidth={2}
      borderBottomColor="rgba(145, 158, 171, 0.32)"
      height={82}
      paddingHorizontal={'$4'}
    >
      <EuCampaignIllustration />
      <Stack flexDirection="row" gap={4}>
        {ROUTES.map((route) => {
          const focused = pathname.replace('/', '') === route.name
          const colorOpacity = opacityToHexCode(route.gradiant[0], 0.09)
          const Icon = () => <route.icon size={28} color={focused ? route.gradiant[0] : '#637381'} />

          return (
            <Link
              key={route.name}
              href={`/${route.name}` as never}
              onPress={() => {
                Analytics.logNavBarItemSelected(route.screenName as AnalyticsScreens)
              }}
            >
              <ButtonNav
                hoverStyle={{
                  backgroundColor: !focused ? colorOpacity : 'transparent',
                  borderColor: 'transparent',
                }}
                pressStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
              >
                <Button.Icon scaleIcon={2}>
                  <Icon />
                </Button.Icon>

                {media.gtMd && (
                  <Button.Text color={focused ? route.gradiant[0] : 'gray8'} fontWeight={'500'}>
                    {route.screenName}
                  </Button.Text>
                )}
              </ButtonNav>
            </Link>
          )
        })}
      </Stack>

      <View flexDirection="row" gap={'$4'} justifyContent="space-between" alignItems="center">
        <Stack gap={2} flexDirection="column" alignContent="flex-end" alignItems="flex-end">
          <Text fontFamily={'$PublicSans'} color={'gray8'} fontWeight={'500'}>
            {profile?.first_name} {profile?.last_name}
          </Text>

          {/* TODO: add the personal code */}
          <Text fontFamily={'$PublicSans'} fontSize={12} color={'gray5'}>
            #000000
          </Text>
        </Stack>

        <Avatar circular size="$4">
          {/* TODO: add the real avatar*/}
          <Avatar.Image source={{ uri: 'https://picsum.photos/200/200', width: 200, height: 200 }} />
          <Avatar.Fallback bc="$gray3" />
        </Avatar>
      </View>
    </Stack>
  )
}

export default NavBar
